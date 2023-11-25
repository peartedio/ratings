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
      keyApi: ''
    }
  },
  computed: {
    ...mapGetters('cinema', [
      'getFilms',
      'getJSON',
      'getRatingFilms'
    ]),
    routeNames () {
      return RouteNames
    },
    downloadRef () {
      return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.getJSON))
    }
  },
  methods: {
    ...mapMutations('cinema', {
      saveApiKeyFoStore: 'saveApiKey'
    }),
    ...mapActions('cinema', {
      saveDataToStore: 'importDataFromFile'
    }),
    saveApiKey () {
      this.saveApiKeyFoStore(this.keyApi)
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

  &__buttons {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
}
</style>
