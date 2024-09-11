import api from '.';

export const fetchSites = async () => {
  const { data, error } = await api.GET('/sites');

  if (error) {
    console.error('Failed fetching stations.', error);
    return {};
  }

  return data;
};
