<template>
  <div>
    <div class="cinema-header">
      <h1>Список фильмов</h1>
      <div class="cinema-header__filters">
        <div v-if="isSelectedFilter">
          <ElSelect v-model="listOrder" placeholder="Тип сортировки">
            <ElOption
              v-for="filterSortingType in filterOrder"
              :key="filterSortingType.value"
              :label="filterSortingType.label"
              :value="filterSortingType.value"
            />
          </ElSelect>
        </div>
        <div>
          <ElSelect v-model="listFilter" placeholder="Фильтр">
            <ElOption
              v-for="filter in filters"
              :key="filter.field"
              :label="filter.label"
              :value="filter.field"
            />
          </ElSelect>
        </div>
      </div>
    </div>

    <CinemaCard v-for="cinema in films" :key="cinema.id" :cinema="cinema" :rating="getRatingFilms[cinema.id]" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { helpCinema } from "@/mixins/cinema";
import { RouteNames } from '@/router/routes';
import CinemaCard from "../cinema/CinemaCard.vue"

const filters = [
  {
    field: null,
    label: "Без фильтра"
  },
  {
    field: "score",
    label: "По оценке"
  },
  {
    field: "year",
    label: "По году"
  },
  {
    field: "name",
    label: "По названию"
  },
  {
    field: "rating",
    label: "По рейтингу"
  }
]

const filterOrder = [
  {
    value: false,
    label: "По возрастанию"
  },
  {
    value: true,
    label: "По убыванию"
  }
]

export default {
  name: 'ListCinema',
  mixins: [helpCinema],
  components: {
    CinemaCard
  },
  data() {
    return {
      listFilter: 'rating',
      listOrder: true
    }
  },
  computed: {
    ...mapGetters('cinema', [
      'getFilmsWithFilter',
      'getRatingFilms',
    ]),
    filters () {
      return filters
    },
    filterOrder() {
      return filterOrder
    },
    routeNames () {
      return RouteNames
    },
    isSelectedFilter () {
      return this.listFilter != null
    },
    films () {
      return this.getFilmsWithFilter({
        field: this.listFilter,
        reverse: this.listFilter ? this.listOrder : false
      })
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
.cinema-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 16px;

  &__filters {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
}
</style>
