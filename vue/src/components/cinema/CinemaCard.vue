<template>
  <RouterLink v-if="cinema" :to="{ name: routeNames.CINEMA_DETAILS, params: { id: cinema.id } }">
    <div class="cinema-card">
      <div class="cinema-card__preview">
        <img class="cinema-card__image" :src="cinema.previewUrl" />
      </div>
      <div class="cinema-card__info">
        <div class="cinema-card__info__item">{{ cinema.name }} <span v-if="cinema.year">({{ cinema.year }})</span></div>
        <div v-if="cinema.originName" class="cinema-card__info__item fs-12 c-gray">{{ cinema.originName }}</div>
        <div v-if="cinema.producer" class="cinema-card__info__item fs-12 c-gray">{{ cinema.producer }}</div>
        <div class="cinema-card__info__item">
          <span style="color: green">
            {{ rating || '0' }}
            <i class="el-icon-s-flag" style="color: green" />
          </span>
          <span style="color: orange">
            {{ cinema.score || '-' }}
            <i class="el-icon-star-on" style="color: orange" />
          </span>
        </div>
      </div>
      <div class="cinema-card__buttons" @click.stop>
        <a v-if="cinema.kinopoiskId" :href="'https://www.kinopoisk.ru/film/' + cinema.id" target="_blank">
          <ElButton type="warning" icon="el-icon-video-camera-solid" circle />
        </a>
        <RouterLink :to="{ name: routeNames.EDIT_CINEMA, params: { id: cinema.id } }">
          <ElButton type="primary" icon="el-icon-edit" circle />
        </RouterLink>
        <ElButton type="danger" icon="el-icon-delete" circle @click="() => deleteCinema(cinema)" />
      </div>
    </div>
  </RouterLink>
</template>

<script>
import { RouteNames } from "@/router/routes";

export default {
  name: 'CinemaCard',
  props: {
    cinema: {
      type: Object,
      default: () => (null)
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  computed: {
    routeNames () {
      return RouteNames
    },
    getScore () {
      return this.cinema ? this.cinema.score : 0
    },
    getSroceIcons () {
      return ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  }
}
</script>

<style scoped lang="less">
@pd: 6px;
.cinema-card {
  display: flex;
  position: relative;
  border-radius: 8px;
  padding: @pd;
  transition: 200ms;

  &:hover {
    background-color: #ececec;
  }

  &__preview {
    margin-right: 10px;
    width: 100%;
    max-width: 100px;
    max-height: 120px;
    border-radius: 8px;
    overflow: hidden;

    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__score {
    margin-top: 8px;
    display: flex;
    font-size: 12px;
    align-items: center;
  }

  &__info {
    color: #343434;
    font-family: @ffOne;

    &__item {
    }
  }

  &__buttons {
    position: absolute;
    right: @pd;
    top: @pd;
    display: flex;
    gap: @pd;
  }
}
</style>
