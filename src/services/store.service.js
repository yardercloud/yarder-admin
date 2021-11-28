import store from 'store'

const storeService = {
  get apiKey () {
    return {
      key: 'apiKey',
      get () { return store.get(this.key) },
      set (apiKey) { store.set(this.key, apiKey) },
      remove () { store.remove(this.key) }
    }
  }
}

export default storeService