<template>
  <PageLayout>
    <section class="p-16">
      <h1>Добавление фильма</h1>
      <CinemaForm btnText="Добавить фильм" @btnClick="(cinema) => saveCinema(cinema)" />
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import CinemaForm from "../forms/CinemaForm"
import { RouteNames } from '@/router/routes'
import { helpCinema } from "@/mixins/cinema"
import { mapActions } from 'vuex'

export default {
  name: "CreateCinema",
  mixins: [helpCinema],
  components: {
    PageLayout,
    CinemaForm
  },
  computed: {
    routeNames() {
      return RouteNames
    }
  },
  methods: {
    ...mapActions('cinema', [
      'createFilm'
    ]),
    saveCinema (cinema) {
      this.createFilm(cinema)
        .then((response) => {
          this.$router.push({ name: RouteNames.CINEMA_DETAILS, params: { id: response.film.id } })
        })
    }
  }
}
</script>
