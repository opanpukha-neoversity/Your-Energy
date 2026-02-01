import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api/';

export default class APIService {
  constructor(baseURL = BASE_URL) {
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async _get(path, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${path}`, { params });
      return response.data;
    } catch (error) {
      console.error('GET error:', path, params, error);
      throw error;
    }
  }

  async _patch(path, data) {
    try {
      const response = await axios.patch(`${this.baseURL}${path}`, data);
      return response.data;
    } catch (error) {
      console.error('PATCH error:', path, data, error);
      throw error;
    }
  }

  async _post(path, data) {
    try {
      const response = await axios.post(`${this.baseURL}${path}`, data);
      return response.data;
    } catch (error) {
      console.error('POST error:', path, data, error);
      throw error;
    }
  }

  async getExercises(filterKey, filterValue, page = 1) {
    return this._get('/exercises', {
      [filterKey]: filterValue,
      page,
      limit: 10,
    });
  }

  async getSearch(filterKey, filterValue, keyword, page = 1) {
    const data = await this._get('/exercises', {
      [filterKey]: filterValue,
      keyword,
      page,
      limit: 10,
    });

    return data.results;
  }

  async getExercisesById(id) {
    return this._get(`/exercises/${id}`);
  }

  async getFilter(filter, page = 1) {
    return this._get('/filters', {
      filter,
      page,
      limit: 12,
    });
  }

  async getQuote() {
    return this._get('/quote');
  }

  async patchRating(id, ratingData) {
    return this._patch(`/exercises/${id}/rating`, ratingData);
  }

  async postSubscriptions(emailData) {
    return this._post('/subscription', emailData);
  }
}
