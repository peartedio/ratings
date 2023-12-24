const AUDIO_KEY = 'AUDIO_STORE'

const syncAudiosWithLocalStorage = (state) => {
  localStorage.setItem(AUDIO_KEY, JSON.stringify(state.audio))
}

const AUDIO_FILES = [
  {
    file: "/files/embracing-the-sky.mp3",
    name: "Nick Petrov - Embracing The Sky"
  },
  {
    file: "/files/on-repeat.mp3",
    name: "Marcus P. - On Repeat"
  },
  {
    file: "/files/dreams.mp3",
    name: "Benjamin Tissot - Dreams"
  }
]

export default {
  namespaced: true,
  state: {
    audio: JSON.parse(localStorage.getItem(AUDIO_KEY))
  },
  getters: {
    getAudio: (state) => { 
      if (state.audio) {
        return state.audio
      }
      return {
        youtubeVideo: false,
        pathToFile: "/files/embracing-the-sky.mp3"
      }
    },
    getAudioFiles: () => AUDIO_FILES
  },
  mutations: {
    editAudio (state, payload) {
      state.audio = payload;
      syncAudiosWithLocalStorage(state)
    }
  }
}
