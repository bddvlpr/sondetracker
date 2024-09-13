import api from '.';

export const fetchListeners = async () => {
  const { data, error } = await api.GET('/listeners/telemetry', {
    params: { query: { duration: '3h' } }
  });

  if (error) {
    console.error('Failed fetching listeners.', error);
    return {};
  }

  return data;
};
