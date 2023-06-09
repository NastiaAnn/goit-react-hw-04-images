import axios from 'axios';

const APIKEY = '35232464-dd394eb40b88e49b2f7bb554e';
const BASE_API = 'https://pixabay.com';

export const fetchImages = async (imageName = '', page = 1) => {
  try {
    return await axios.get(`${BASE_API}/api/`, {
      params: {
        q: imageName,
        page: page,
        per_page: 12,
        key: APIKEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
