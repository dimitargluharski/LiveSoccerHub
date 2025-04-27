const KEY = import.meta.env.VITE_API_KEY;
const API_HOST = 'v3.football.api-sports.io';

export const getSquadStatistics = async (venueId: number) => {
  const url = `https://v3.football.api-sports.io/venues?id=${venueId}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.response;

  } catch (error) {
    console.log('error', error);
  }
}