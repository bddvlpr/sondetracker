import api from '.';

export const fetchSondes = async (serial?: string) => {
  const { data, error } = await api.GET('/sondes/telemetry', {
    params: { query: { duration: serial ? '3d' : '3h', serial } }
  });

  if (error) {
    console.error('Failed fetching sondes.', error);
    return {};
  }

  return data;
};
