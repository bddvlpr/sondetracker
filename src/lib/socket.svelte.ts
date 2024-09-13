import { Client, Message, type SubscribeOptions, type UnsubscribeOptions } from 'paho-mqtt';

import type { Listener, Sonde } from './api';

import { updateListener, updateSonde } from './telemetry.svelte';

const WSS_DATA_URL = 'wss://ws-reader.v2.sondehub.org/';

export const socket = new Client(WSS_DATA_URL, `Sondetracker-${(Math.random() * 10000).toFixed()}`);

const subscriptions = $state<string[]>([]);

export const getSubscriptions = () => subscriptions;

export const connectSocket = () => {
  if (socket.isConnected()) return;
  socket.onMessageArrived = onMessageArrived;
  socket.connect({
    onSuccess: () => {
      subscribe('listener/#');
      subscribe('sondes-new/#');
    },
    reconnect: true
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const subscribe = (topic: string, options?: SubscribeOptions) => {
  if (subscriptions.includes(topic)) {
    console.warn('Topic already included, skipping.', topic);
    return;
  }

  subscriptions.push(topic);
  socket.subscribe(topic, options);
};

export const unsubscribe = (topic: string, options?: UnsubscribeOptions) => {
  if (!subscriptions.includes(topic)) {
    console.warn("Topic isn't included, skipping.", topic);
    return;
  }

  const index = subscriptions.indexOf(topic);
  if (index >= 0) {
    subscriptions.splice(index, 1);
    socket.unsubscribe(topic, options);
  }
};

export const unsubscribeAll = (options?: UnsubscribeOptions) => {
  for (let index = subscriptions.length - 1; index >= 0; index--) {
    const topic = subscriptions[index];
    if (topic.startsWith('sondes/')) {
      subscriptions.splice(index, 1);
      socket.unsubscribe(topic, options);
    }
  }
};

const onMessageArrived = (message: Message) => {
  const { destinationName, payloadString } = message;

  try {
    const payload = JSON.parse(payloadString);
    if (destinationName.startsWith('listener')) {
      updateListener(payload as Listener);
    } else if (destinationName.startsWith('sondes')) {
      updateSonde(payload as Sonde);
    } else {
      console.warn('Unhandled message.', payload);
    }
  } catch (e) {
    console.warn('Failed decoding packet.', e);
  }
};
