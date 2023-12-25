<template>
  <div class="audio-button">
    <audio
      v-if="!getAudio.youtubeVideo" 
      class="audio-button__player" 
      ref="player"
    >
      <source :src="getAudio.pathToFile" type="audio/mp3" />
    </audio>
    <iframe 
      v-if="getAudio.youtubeVideo" 
      width="0" 
      height="0"
      :src="'https://www.youtube.com/embed/' + getAudio.youtubeId + '?rel=0?version=3&showinfo=0&loop=1&playlist=' + getAudio.youtubeId + '&enablejsapi=1'"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen 
      ref="youtubePlayer" 
    />
    <ElButton 
      type="success" 
      @click="() => togglePlay()" 
      :icon="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AudioButton',
  data() {
    return {
      isPlaying: false
    };
  },
  computed: {
    ...mapGetters('audio', [
      'getAudio'
    ])
  },
  mounted() {
    if (!this.getAudio.youtubeVideo) {
      const audio = this.$refs.player;
      audio.addEventListener("ended", this.endListener);
    }
  },
  methods: {
    togglePlay() {
      if (this.getAudio.youtubeVideo) {
        const message = this.isPlaying ? 'pauseVideo' : 'playVideo'
        const iframe = this.$refs.youtubePlayer.contentWindow;
        iframe.postMessage(
          '{"event":"command","func":"' + message + '","args":""}',
          "*"
        );
      } else {
        if (this.isPlaying) {
          this.$refs.player.pause();
        } else {
          this.$refs.player.play();
        }
      }
      this.isPlaying = !this.isPlaying;
    },
    endListener() {
      const audio = this.$refs.player;
      audio.currentTime = 0;
      audio.play();
    }
  }
}
</script>

<style scoped lang="less">
.audio-button {
  margin: 0 auto;
  padding: 16px 6px 0px 6px;
  overflow: auto;
  box-sizing: border-box;
  max-width: 1000px;

  &__player {
    display: none;
  }
}
</style>