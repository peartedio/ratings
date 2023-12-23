<template>
  <PageLayout>
    <section v-if="cinema" class="p-16">
      <div class="cinema-details">
        <div class="cinema-details__preview">
          <img class="cinema-details__image" :src="cinema.previewUrl || '/files/film.png'" />
        </div>
        <div class="cinema-details__info">
          <div class="cinema-details__info__item">{{ cinema.name }} <span v-if="cinema.year">({{ cinema.year }})</span></div>
          <div v-if="cinema.originName" class="cinema-details__info__origin-name fs-12 c-gray">{{ cinema.originName }}</div>
          <div class="cinema-details__info__item">
          <span style="color: green">
            {{ rating || '0' }}
            <i class="el-icon-s-flag" style="color: green" />
          </span>
            <span style="color: orange">
            {{ cinema.score || '-' }}
            <i class="el-icon-star-on" style="color: orange" />
          </span>
          </div>
          <div v-if="tags.length > 0" class="cinema-details__tags" >
            <img v-for="tag in tags"
              :key="tag.key"
              class="cinema-details__tags__item"
              :src="tag.image"
              :alt="tag.title"
              :title="tag.title"
            />
          </div>
          <div class="cinema-details__buttons" @click.stop>
            <a v-if="cinema.kinopoiskId" :href="'https://www.kinopoisk.ru/film/' + cinema.kinopoiskId" target="_blank">
              <ElButton type="warning" icon="el-icon-video-camera-solid" circle />
            </a>
            <RouterLink :to="{ name: routeNames.EDIT_CINEMA, params: { id: cinema.id } }">
              <ElButton type="primary" icon="el-icon-edit" circle />
            </RouterLink>
            <ElButton type="danger" icon="el-icon-delete" circle @click="() => deleteCinema(cinema)" />
          </div>
          <div v-if="cinema.description" class="cinema-details__info__description">{{ cinema.description }}</div>
          <div v-if="cinema.review" class="cinema-details__info__review">
            <div class="cinema-details__info__review__title" >Отзыв:</div>
            {{ cinema.review }}
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpCinema } from "@/mixins/cinema";
import { RouteNames } from '@/router/routes'

export default {
  name: 'CinemaDetails',
  mixins: [helpCinema],
  components: {
    PageLayout
  },
  computed: {
    rating () {
      return this.getRatingFilms[this.cinema.id]
    },
    getScore () {
      return this.cinema ? this.cinema.score : 0
    },
    getSroceIcons () {
      return ['#99A9BF', '#F7BA2A', '#FF9900']
    },
    cinema () {
      return this.getFilm(this.$route.params.id)
    },
    tags () {
      return this.getTagsForFilm(this.cinema)
    },
    routeNames() {
      return RouteNames
    },
    previewStyle () {
      return {
        backgroundImage: `url(${this.cinema.previewUrl || ''})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`
      }
    }
  },
  methods: {
    deleteCinema () {
      this.removeCinema(this.cinema.id)
      this.$router.replace({ name: RouteNames.LIST_CINEMA })
    }
  }
}
</script>

<style scoped lang="less">
@pd: 6px;
.cinema-details {
  display: flex;
  position: relative;
  border-radius: 8px;
  padding: @pd;
  transition: 200ms;
  gap: 10px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__preview {
    width: 100%;
    max-width: 300px;
    max-height: 420px;
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

    @media screen and (max-width: 600px) {
      text-align: center;
    }

    &__item {
      font-size: 20px;
    }

    &__origin-name {
      font-size: 14px;
    }

    &__description {
      font-size: 16px;
    }

    &__review {
      font-size: 12px;

      &__title {
        font-size: 16px;
        margin-top: 16px;
      }
    }
  }

  &__tags {
    margin-top: 16px;

    &__item {
      width: 64px;
      height: 64px;
      margin-right: 16px;
    }
  }

  &__buttons {
    margin-top: 10px;
    display: flex;
    gap: @pd;

    @media screen and (max-width: 600px) {
      justify-content: center;
    }
  }
}
</style>
