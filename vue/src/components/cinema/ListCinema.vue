<template>
  <div>
    <div class="cinema-header">
      <h1>Список фильмов</h1>
      <div class="cinema-header__filters">
        <div v-if="isSelectedFilter">
          <ElSelect v-model="listOrder" placeholder="Тип сортировки" size="mini">
            <ElOption
              v-for="filterSortingType in filterOrder"
              :key="filterSortingType.value"
              :label="filterSortingType.label"
              :value="filterSortingType.value"
            />
          </ElSelect>
        </div>
        <div>
          <ElSelect v-model="listFilter" placeholder="Фильтр" size="mini">
            <ElOption
              v-for="filter in filters"
              :key="filter.field"
              :label="filter.label"
              :value="filter.field"
            />
          </ElSelect>
        </div>
        <div>
          <ElSelect v-model="listTypes" placeholder="Тип" size="mini">
            <ElOption
              v-for="filter in filterTypes"
              :key="filter.value"
              :label="filter.label"
              :value="filter.value"
            />
          </ElSelect>
        </div>
        <div>
          <ElSwitch v-model="isNumeration" active-text="Нумерация" />
        </div>
      </div>
    </div>

    <div class="list-cinema__list">
      <CinemaCard
        v-for="(cinema, index) in films"
        :key="cinema.id"
        :cinema="cinema"
        :rating="getRatingFilms[cinema.id]"
        :tags="getTagsForFilm(cinema)"
        :index="isNumeration ? index + 1 : 0"
      />
    </div>
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
    label: "Без сортировки"
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

const listTypes = [
  {
    value: 'ALL',
    label: "Все"
  },
  {
    value: "SERIAL",
    label: "Сериалы"
  },
  {
    value: "FILM",
    label: "Фильмы"
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
      listOrder: true,
      listTypes: 'ALL',
      isNumeration: true
    }
  },
  computed: {
    ...mapGetters('cinema', [
      'getFilmsWithFilter',
      'getRatingFilms',
      'getTagsForFilm'
    ]),
    filters () {
      return filters
    },
    filterOrder () {
      return filterOrder
    },
    filterTypes () {
      return listTypes
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
        reverse: this.listFilter ? this.listOrder : false,
        type: this.listTypes
      })
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
  gap: 6px;

  &__filters {
    display: flex;
    flex-direction: row;
    gap: 6px;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
}

.list-cinema__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}
</style>
