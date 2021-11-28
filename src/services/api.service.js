import axios from 'axios'
import storeService from './store.service'

const apiService = {
  get client () {
    return axios.create({
      baseURL: process.env.REACT_APP_YARDER_HOST_URL,
      headers: {
        'Yarder-Api-Key': storeService.apiKey.get()
      }
    })
  },

  async search({ from, size, level, body }, callback) {
    const params = { from, size, level, body }
    const response = await this.client.get('/', { params })
    callback(response.data)
  }
}

export default apiService
