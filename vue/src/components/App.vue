<template>
  <div>
    <AudioButton />
    <RouterView />
    <ModalContainer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalContainer from "@/components/parts/ModalContainer";
import AudioButton from "@/components/audio/AudioButton";

const FIRST_LOAD = 'FIRST_LOAD'

export default {
  components: {
    ModalContainer,
    AudioButton
  },
  mounted () {
    if (!localStorage.getItem(FIRST_LOAD)) {
      localStorage.setItem(FIRST_LOAD, 'TRUE')
      this.resetRatings()
    }
  },
  methods: {
    ...mapActions('cinema', [
      'resetRatings'
    ])
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: @cBaseTwo;
  font-family: @ffOne;
}

a {
  text-decoration: none;
}

section {
  background-color: @cBaseOne;
  margin-bottom: 20px;
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}

h1, h2, h3, h4, h5 {
  font-family: @ffOne;
  color: @cBaseThree;
  margin: 0;
}

h2 {
  font-size: 32px;
}

.p-16 {
  padding: 16px;
}

.d-flex {
  display: flex;
}

.gap-20 {
  gap: 20px;
}

.fs-12 {
  font-size: 12px;
}

.c-gray {
  color: #575757;
}

.w-100 {
  width: 100%;
}

.header {
  margin-bottom: 16px;
}

.page-msg {
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: center;
  font-family: @ffOne;
  color: #727272;
}

.el-message-box {
  font-family: @ffOne !important;
}
</style>
