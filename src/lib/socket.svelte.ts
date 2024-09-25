import mqtt from 'mqtt';

import type { Listener, Sonde } from './api';

import { updateListener, updateSonde } from './telemetry.svelte';

const WSS_DATA_URL = 'wss://ws-reader.v2.sondehub.org/';

export const client: mqtt.MqttClient = await mqtt.connectAsync(WSS_DATA_URL, {
  clientId: `Sondetracker-${(Math.random() * 10000).toFixed()}`
});

const onMessageArrived = (topic: string, buffer: Buffer) => {
  try {
    const payload = JSON.parse(buffer.toString());
    if (topic.startsWith('listener')) {
      updateListener(payload as Listener);
    } else if (topic.startsWith('sondes')) {
      updateSonde(payload as Sonde);
    } else {
      console.warn('Unhandled message.', payload);
    }
  } catch (e) {
    console.warn('Failed decoding packet.', e);
  }
};

client.on('connect', () => client.subscribe(['listener/#', 'sondes-new/#']));
client.on('message', onMessageArrived);
