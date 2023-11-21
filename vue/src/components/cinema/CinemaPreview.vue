<template>
  <div class="cinema-preview" :style="styles">
    <div class="cinema-preview__content">
      <div class="cinema-preview__info">
        <div class="cinema-preview__name">{{ cinema.name }} <span v-if="cinema.year">({{ cinema.year }})</span></div>
        <div class="cinema-preview__origin-name">{{ cinema.originName }}</div>
        <div class="cinema-preview__ratings">
          <span style="color: green">
            {{ rating || '0' }}
            <i class="el-icon-s-flag" style="color: green" />
          </span>
          <span style="color: orange">
            {{ cinema.score || '-' }}
            <i class="el-icon-star-on" style="color: orange" />
          </span>
        </div>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CinemaPreview",
  props: {
    cinema: Object,
    rating: {
      type: Number,
      default: 0
    }
  },
  computed: {
    styles () {
      return {
        backgroundImage: `url(${this.cinema.previewUrl || ''})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`
      }
    }
  }
}
</script>

<style scoped lang="less">
.cinema-preview {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  overflow: hidden;
  border-radius: 6px;
  width: 300px;
  height: 400px;

  &__info {
    color: white;
    font-family: @ffOne;
    text-align: center;
    padding-top: 20px;
  }

  &__content {
    width: 100%;
    box-sizing: border-box;
    padding: 6px;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75) 15%);
  }

  &__ratings {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  &__name {
    font-size: 18px;
    font-weight: 600;
  }

  &__origin-name {
    font-size: 12px;
    font-weight: 400;
  }

  &__image {
    height: 350px;
    border-radius: 4px;
  }
}
</style>
