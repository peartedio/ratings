<template>
  <PageLayout>
    <section v-if="cinema" class="p-16">
      <div class="cinema-details">
        <div class="cinema-details__preview" :style="previewStyle"/>
        <div class="cinema-details__info">
          <div class="cinema-details__info__item cinema-details__info__name">{{ cinema.name }}</div>
          <div class="cinema-details__info__item">Оригинальное название: {{ cinema.originName }}</div>
          <div class="cinema-details__info__item">Режиссер: {{ cinema.producer }}</div>
          <div class="cinema-details__info__item">Год: {{ cinema.year }}</div>
        </div>
        <div class="cinema-details__header">
          <ElRate v-model="getScore" disabled :colors="getSroceIcons" />
          <div class="cinema-details__header__buttons">
            <RouterLink :to="{ name: routeNames.EDIT_CINEMA, params: { id: cinema.id } }">
              <ElButton type="primary" icon="el-icon-edit" circle />
            </RouterLink>
            <ElButton type="danger" icon="el-icon-delete" circle @click="() => deleteCinema()" />
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
    getScore () {
      return this.cinema ? this.cinema.score : 0
    },
    getSroceIcons () {
      return ['#99A9BF', '#F7BA2A', '#FF9900']
    },
    cinema () {
      return this.getFilm(this.$route.params.id)
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
.cinema-details {
  display: flex;

  &__header {
    grid-area: header;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__buttons {
      display: flex;
      flex-direction: row;
      justify-content: end;
      gap: 16px
    }
  }

  &__preview {
    width: 40%;
    background-color: #bababa;
    background-size: cover;
    background-position: center;
  }

  &__info {
    grid-area: info;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__name {
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>
