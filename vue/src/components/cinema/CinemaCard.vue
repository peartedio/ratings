<template>
  <RouterLink v-if="cinema" :to="{ name: routeNames.CINEMA_DETAILS, params: { id: cinema.id } }">
    <div class="cinema-card">
      <div class="cinema-card__preview">
        <img class="cinema-card__image" :src="cinema.previewUrl || '/files/film.png'" />
      </div>
      <div class="cinema-card__info">
        <div class="cinema-card__info__item">
          <span v-if="index">{{index}}. </span>{{ cinema.name }} <span v-if="cinema.year">({{ cinema.year }})</span>
        </div>
        <div v-if="cinema.originName" class="cinema-card__info__item fs-12 c-gray">{{ cinema.originName }}</div>
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
        <div v-if="tags.length > 0" class="cinema-card__tags" >
          <img v-for="tag in tags"
            :key="tag.key"
            class="cinema-card__tags__item"
            :src="tag.image"
            :alt="tag.title"
            :title="tag.title" />
        </div>
        <div class="cinema-card__buttons">
          <a v-if="cinema.kinopoiskId" @click.stop :href="'https://www.kinopoisk.ru/film/' + cinema.kinopoiskId" target="_blank">
            <ElButton type="warning" icon="el-icon-video-camera-solid" size="mini" circle />
          </a>
          <RouterLink :to="{ name: routeNames.EDIT_CINEMA, params: { id: cinema.id } }" @click.stop>
            <ElButton type="primary" icon="el-icon-edit" size="mini" circle />
          </RouterLink>
          <ElButton type="danger" icon="el-icon-delete" size="mini" circle @click.stop.prevent="() => deleteCinema(cinema)" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import { RouteNames } from "@/router/routes";
import { helpCinema } from "@/mixins/cinema";

export default {
  name: 'CinemaCard',
  mixins: [helpCinema],
  props: {
    cinema: {
      type: Object,
      default: () => (null)
    },
    rating: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      default: () => []
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
  },
  methods: {
    deleteCinema (cinema) {
      this.removeCinema(cinema.id)
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
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &__item {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  &__buttons {
    display: flex;
    gap: @pd;
    flex: 1;
    align-items: end;
  }

  &__tags {
    margin-top: 4px;

    &__item {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
}
</style>
