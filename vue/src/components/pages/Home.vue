<template>
  <PageLayout>
    <section class="p-16">
      <ListCinema />
    </section>
  </PageLayout>
</template>

<script>
import { helpModal } from "@/mixins/modals";
import { RouteNames } from '@/router/routes';
import PageLayout from '@/components/parts/PageLayout'
import ListCinema from '@/components/cinema/ListCinema'

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout,
    ListCinema
  },
  computed: {
    routeNames () {
      return RouteNames
    },
    getButtonsText () {
      return {
        addCinema: "Добавить фильм",
        createCinema: "Показать список фильмов",
        makeRating: "Составить рейтинг",
        settings: "Настройки"
      }
    }
  }
}
</script>

<style lang="less"></style>
