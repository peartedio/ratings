<template>
  <PageLayout>
    <section class="p-16">
      <h1>Редактирование фильма</h1>
      <CinemaForm btnText="Сохранить изменения" :edit-mode="true" :cinema="cinema" @btnClick="(cinema) => changeCinema(cinema)" />
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
      return this.getFilm(this.$route.params.id)
    },
    routeNames() {
      return RouteNames
    }
  },
  methods: {
    changeCinema (cinema) {
      this.editCinema(cinema)
      this.$router.push({ name: RouteNames.CINEMA_DETAILS, params: { id: cinema.id } })
    }
  }
}
</script>
