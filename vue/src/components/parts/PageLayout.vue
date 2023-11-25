<template>
  <div>
    <div class="content">
      <div class="page-menu-content">
        <RouterLink :to="{ name: routeNames.HOME }" class="page-menu__item">
          <ElButton
            type="primary"
            icon="el-icon-document-copy"
            class="page-menu__item"
            :plain="$route.name !== routeNames.HOME"
          >
            {{ getButtonsText.createCinema }}
          </ElButton>
        </RouterLink>
        <RouterLink :to="{ name: routeNames.RATING_FILMS }" class="page-menu__item">
          <ElButton
            type="warning"
            icon="el-icon-trophy"
            class="page-menu__item"
            :plain="$route.name !== routeNames.RATING_FILMS"
          >
            {{ getButtonsText.makeRating }}
          </ElButton>
        </RouterLink>
        <RouterLink :to="{ name: routeNames.CREATE_CINEMA }" class="page-menu__item">
          <ElButton
            type="success"
            icon="el-icon-plus"
            class="page-menu__item"
            :plain="$route.name !== routeNames.CREATE_CINEMA"
          >
            {{ getButtonsText.addCinema }}
          </ElButton>
        </RouterLink>
        <RouterLink v-if="isAdmin" :to="{ name: routeNames.SETTINGS }" class="page-menu__item">
          <ElButton
            type="info"
            icon="el-icon-setting"
            class="page-menu__item"
            :plain="$route.name !== routeNames.SETTINGS"
          >
            {{ getButtonsText.settings }}
          </ElButton>
        </RouterLink>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
import { RouteNames } from "@/router/routes";
import { mapGetters } from "vuex";

export default {
  name: 'PageLayout',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('cinema', [
      'isAdmin'
    ]),
    routeNames () {
      return RouteNames
    },
    getButtonsText () {
      return {
        addCinema: "Добавить фильм",
        createCinema: "Список фильмов",
        makeRating: "Рейтинг фильмов",
        settings: "Настройки"
      }
    }
  }
}
</script>

<style scoped lang="less">
.content {
  margin: 0 auto;
  padding: 20px 6px;
  min-height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  max-width: 1000px;
}

.page-menu-content {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.page-menu__item {
  @media screen and (max-width: 800px) {
    width: 100%;
    flex: 1;
  }
}
</style>
