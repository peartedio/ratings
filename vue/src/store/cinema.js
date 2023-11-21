import axios from 'axios'

export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

export const genHash = (length = 32) => {
  let hash = "";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    hash += chars[randomInteger(0, chars.length-1)]
  }

  return hash + Date.now();
}

const FILMS_KEY = 'CINEMA_STORE'
const RATING_FILMS_KEY = 'RATING_FILMS_STORE'
const DEPENDS_KEY = 'DEPENDS_STORE'
const API_KEY = "API_KEY"

const syncFilmsWithLocalStorage = (state) => {
  localStorage.setItem(FILMS_KEY, JSON.stringify(state.films))
}
const syncRatingFilmsWithLocalStorage = (state) => {
  localStorage.setItem(RATING_FILMS_KEY, JSON.stringify(state.rating))
}
const syncDependsFilmsWithLocalStorage = (state) => {
  localStorage.setItem(DEPENDS_KEY, JSON.stringify(state.depends))
}
const syncApiKeyWithLocalStorage = (state) => {
  localStorage.setItem(API_KEY, state.keyApi)
}

const axiosInstance = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2'
})
axiosInstance.defaults.headers['X-API-KEY'] = localStorage.getItem(API_KEY) || ""

const jsonPathFiles = '/files/films.json'

export default {
  namespaced: true,
  state: {
    films: JSON.parse(localStorage.getItem(FILMS_KEY)) || [],
    rating: JSON.parse(localStorage.getItem(RATING_FILMS_KEY)) || {},
    depends: JSON.parse(localStorage.getItem(DEPENDS_KEY)) || {},
    keyApi: localStorage.getItem(API_KEY) || ""
  },
  getters: {
    getFilms: (state) => state.films,
    getFilm: (state) => (id) => state.films.find((film) => film.id == id),
    getRatingFilms: (state) => state.rating,
    getDependsFilms: (state) => state.depends,
    getFilmsWithFilter: (state) => ({ field, reverse }) => {
      const films = state.films.slice()
      const rating = state.rating
      if (!field) {
        return films.sort((a, b) => a["date"] - b["date"])
      }
      if (field === "rating") {
        films.sort((first, second) => {
          const r1 = rating[first.id] || 0
          const r2 = rating[second.id] || 0
          if (r1 > r1) {
            return 1
          } else if (r1 < r2) {
            return -1
          } else {
            return 0
          }
        })
      } else {
        films.sort((a, b) => {
          const r1 = a[field]
          const r2 = b[field]
          if (r1 > r1) {
            return 1
          } else if (r1 < r2) {
            return -1
          } else {
            return 0
          }
        })
      }
      return reverse ? films.reverse() : films
    },
  },
  mutations: {
    addCinema (state, payload) {
      state.films.push(payload)
      syncFilmsWithLocalStorage(state)
    },
    removeCinema (state, payload) {
      state.films = state.films.filter((film) => film.id != payload)
      delete state.rating[payload]
      syncFilmsWithLocalStorage(state)
      syncRatingFilmsWithLocalStorage(state)
    },
    editCinema (state, payload) {
      state.films = state.films.map((film) => film.id == payload.id ? payload : film)
      syncFilmsWithLocalStorage(state)
    },
    updateRatingCinema (state, payload) {
      const currentRating = state.rating[payload.id] || 0
      state.rating = {
        ...state.rating,
        [payload.id]: currentRating + payload.count
      }
      if (payload.subId === 0 || payload.subId) {
        const currentDepends = state.depends[payload.id] || []
        currentDepends.push(payload.subId)
        state.depends = {
          ...state.depends,
          [payload.id]: currentDepends
        }
        syncDependsFilmsWithLocalStorage(state)
      }
      syncRatingFilmsWithLocalStorage(state)
    },
    clearRating (state) {
      state.rating = {}
      state.depends = {}
      syncRatingFilmsWithLocalStorage(state)
      syncDependsFilmsWithLocalStorage(state)
    },
    saveApiKey (state, payload) {
      state.keyApi = payload
      syncApiKeyWithLocalStorage(state)
      axiosInstance.defaults.headers['X-API-KEY'] = payload
    },
    setFilms (state, payload) {
      state.films = payload
      syncFilmsWithLocalStorage(state)
    },
    setRatings (state, payload) {
      state.rating = payload
      syncRatingFilmsWithLocalStorage(state)
    }
  },
  actions: {
    loadFilmById: (store, payload) => new Promise((resolve, reject) => {
      axiosInstance.get('/films/' + payload)
        .then(response => {
          if (response.data) {
            resolve(response.data)
          }
          reject(new Error("Данные не были получены"))
        })
        .catch(error => {
          reject(error)
        })
    }),
    createFilm: ({ commit }, payload) => new Promise((resolve) => {
      const film = {
        ...payload,
        id: genHash()
      }
      commit('addCinema', film)
      return resolve({ film })
    }),
    resetRatings: ({ commit }) => {
      axios.get(jsonPathFiles)
        .then((r) => {
          if (r.data.films) {
            commit('setFilms', r.data.films)
          }
          if (r.data.rating) {
            commit('setRatings', r.data.rating)
          }
        })
    },
    importDataFromFile: ({ commit }, payload) => new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsText(payload.raw)
      fileReader.onload = () => {
        const dataAsJson = JSON.parse(fileReader.result)
        if (dataAsJson.films) {
          commit('setFilms', dataAsJson.films)
        }
        if (dataAsJson.rating) {
          commit('setRatings', dataAsJson.rating)
        }
        return resolve()
      }
      fileReader.onerror = () => {
        return reject("Не удалось загрузить файл")
      }
    })
  }
}
