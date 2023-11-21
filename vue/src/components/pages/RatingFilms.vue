<template>
  <PageLayout>
    <section class="p-16 rating-header">
      <h1>Рейтинг фильмов</h1>
      <div class="d-flex gap-6">
        <ElButton type="danger" size="small" @click="() => resetRatings()">Сбросить</ElButton>
        <ElButton type="warning" size="small" @click="() => clearRating()">Составить</ElButton>
      </div>
    </section>

    <section class="p-16">
      <div v-if="films.length === 0">
        <h1>Фильмы не найдены. Необходимо добавить фильм для составления рейтинга</h1>
      </div>
      <div v-else-if="getFilmsForRating">
        <h1>Составление рейтинга</h1>
        <div class="rating">
          <CinemaPreview :cinema="getFilmsForRating.firstFilm" :rating="getRatings.firstRating">
            <div class="rating__controls">
              <ElButton @click="() => addRating(getFilmsForRating.firstFilm, 10, getFilmsForRating.secondFilm)" type="success">+10</ElButton>
              <ElButton @click="() => addRating(getFilmsForRating.firstFilm, 1, getFilmsForRating.secondFilm)" type="primary">+1</ElButton>
            </div>
          </CinemaPreview>

          <CinemaPreview :cinema="getFilmsForRating.secondFilm" :rating="getRatings.secondRating">
            <div class="rating__controls">
              <ElButton @click="() => addRating(getFilmsForRating.secondFilm, 1, getFilmsForRating.firstFilm)" type="primary">+1</ElButton>
              <ElButton @click="() => addRating(getFilmsForRating.secondFilm, 10, getFilmsForRating.firstFilm)" type="success">+10</ElButton>
            </div>
          </CinemaPreview>
        </div>
      </div>
      <div v-else>
        <div class="page-msg">
          <span>Рейтинг составлен</span>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PageLayout from '../parts/PageLayout'
import CinemaPreview from '../cinema/CinemaPreview.vue';
import { RouteNames } from '@/router/routes';

export default {
  name: "RatingFilms",
  components: {
    PageLayout,
    CinemaPreview
  },
  computed: {
    ...mapGetters('cinema', [
      'getFilmsWithFilter',
      'getRatingFilms',
      'getDependsFilms',
    ]),
    routeNames () {
      return RouteNames
    },
    films () {
      return this.getFilmsWithFilter({
        field: "rating",
        reverse: true
      })
    },
    getFilmsForRating () {
      for (let i = 0; i < this.films.length - 1; i++) {
        const firstFilm = this.films[i]

        for (let j = i + 1; j < this.films.length; j++) {
          const secondFilm = this.films[j]
          const firstRating = this.getRatingFilms[firstFilm.id] || 0
          const secondRating = this.getRatingFilms[secondFilm.id] || 0

          if (firstRating === secondRating) {
            return {
              firstFilm,
              secondFilm
            }
          }
        }
      }
      return null
    },
    getRatings () {
      const currentFilms = this.getFilmsForRating
      return {
        firstRating: this.getRatingFilms[currentFilms.firstFilm.id] || 0,
        secondRating: this.getRatingFilms[currentFilms.secondFilm.id] || 0
      }
    }
  },
  methods: {
    ...mapMutations('cinema', [
      'updateRatingCinema',
      'clearRating'
    ]),
    ...mapActions('cinema', [
      'resetRatings',
    ]),
    addRating (cinema, count, sub) {
      this.updateRatingCinema({
        id: cinema.id,
        subId: sub.id,
        count: count
      })
    }
  },
  watch: {
    getFilmsForRating: {
      handler (v) {
        if (!v) {
          return
        }
        const firstDepends = this.getDependsFilms[v.firstFilm.id] || []
        const secondDepends = this.getDependsFilms[v.secondFilm.id] || []

        if (firstDepends.includes(v.secondFilm.id)) {
          this.updateRatingCinema({
            id: v.firstFilm.id,
            count: 1
          })
        } else if (secondDepends.includes(v.firstFilm.id)) {
          this.updateRatingCinema({
            id: v.secondFilm.id,
            count: 1
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.rating-header {
  display: flex;
  justify-content: space-between;
}

.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 16px;
  margin-top: 40px;

  &__divider {
    background-color: gray;
  }

  &__cinema {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    overflow: hidden;
  }

  &__controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;

    &__container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
    }
  }
}
</style>
