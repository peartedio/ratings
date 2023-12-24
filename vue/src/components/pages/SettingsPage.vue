<template>
  <PageLayout>
    <section class="p-16">
      <div class="settings">
        <h1>Настройки</h1>
        <div class="settings__key-form">
          <ElInput v-model="keyApi" placeholder="API ключ"/>
          <ElButton
            type="success"
            icon="el-icon-check"
            plain
            @click="() => saveApiKey()"
          >
            Сохранить ключ
          </ElButton>
        </div>
        <div class="settings__buttons">
          <a
            :href="downloadRef"
            class="el-button el-icon-download"
            download="films.json"
          >
            <span>Экспорт данных</span>
          </a>
          <ElUpload
            action=""
            accept=".json"
            :limit="1"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="(file) => importData(file)"
          >
            <ElButton
              type="primary"
              icon="el-icon-upload2"
              plain
            >
              Импорт данных
            </ElButton>
          </ElUpload>
        </div>
        <div class="settings__field">
          <ElSwitch 
            v-model="audioForm.youtubeVideo"
            active-text="Использовать youtube видео"
            inactive-text="Использовать стаднартный аудио файл"
          />
        </div>
        <div v-if="audioForm.youtubeVideo" class="settings__field">
          <ElInput v-model="audioForm.youtubeId" placeholder="ID youtube видео"/>
        </div>
        <div v-if="!audioForm.youtubeVideo" class="settings__field">
          <ElSelect 
            v-model="audioForm.pathToFile" 
            placeholder="Аудио файл"
            class="w-100" 
          >
            <ElOption
              v-for="audioFile in getAudioFiles"
              :key="audioFile.file"
              :label="audioFile.name"
              :value="audioFile.file"
            />
          </ElSelect>
        </div>
        <div class="settings__field">
          <ElButton
            type="success"
            icon="el-icon-check"
            plain
            @click="() => editAudio()"
          >
            Сохранить настройки аудио
          </ElButton>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { RouteNames } from '@/router/routes'

export default {
  name: 'SettingsPage',
  components: {
    PageLayout
  },
  data () {
    return {
      keyApi: '',
      audioForm: {
        pathToFile: '',
        youtubeVideo: false,
        youtubeId: ''
      },
    }
  },
  computed: {
    ...mapGetters('cinema', [
      'getFilms',
      'getJSON',
      'getRatingFilms'
    ]),
    ...mapGetters('audio', [
      'getAudio',
      'getAudioFiles'
    ]),
    routeNames () {
      return RouteNames
    },
    downloadRef () {
      return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.getJSON))
    }
  },
  mounted: function () {
    if (this.getAudio) {
      this.audioForm = {
        ...this.audioForm,
        ...this.getAudio
      }
    }
  },
  methods: {
    ...mapMutations('cinema', {
      saveApiKeyFoStore: 'saveApiKey'
    }),
    ...mapMutations('audio', {
      editAudioFoStore: 'editAudio'
    }),
    ...mapActions('cinema', {
      saveDataToStore: 'importDataFromFile'
    }),
    saveApiKey () {
      this.saveApiKeyFoStore(this.keyApi)
    },
    editAudio () {
      this.editAudioFoStore(this.audioForm)
    },
    importData (file) {
      this.saveDataToStore(file)
        .then(() => {
          this.$message({
            message: 'Данные сохранены',
            type: 'success'
          })
        })
        .catch((message) => {
          this.$message.error(message)
        })
    }
  }
}
</script>

<style scoped lang="less">
.settings {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__key-form {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

  &__field {
    margin-top: 16px;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
}
</style>
