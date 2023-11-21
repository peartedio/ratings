<template>
  <PageLayout>
    <section class="p-16">
      <h1>Редактирование фильма</h1>
      <CinemaForm :btnText="editCinemaBtnText" :cinema="cinema" @btnClick="(cinema) => changeCinema(cinema)" />
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import CinemaForm from "../forms/CinemaForm"
import { helpCinema } from "@/mixins/cinema"
import { RouteNames } from '@/router/routes'

export default {
  name: 'EditCinema',
  mixins: [helpCinema],
  components: {
    PageLayout,
    CinemaForm
  },
  computed: {
    cinema () {
      const cinemaId = this.$route.params.id
      return this.getFilm(cinemaId)
    },
    editCinemaBtnText () {
      return "Сохранить изменения"
    },
    routeNames() {
      return RouteNames
    }
  },
  methods: {
    changeCinema (cinema) {
      this.editCinema(cinema)
      this.$router.push({ name: RouteNames.LIST_CINEMA })
    }
  }
}
</script>
