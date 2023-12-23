<template>
  <div class="cinema-form">
    <div v-if="isAdmin" class="cinema-form__load-by-id">
      <ElButton
        type="primary"
        size="mini"
        @click="() => changeVisibleFormById()"
      >
        {{  isVisibleLoadFormById ? "Отмена" : "Загрузить по id"  }}
      </ElButton>
      <div v-if="isVisibleLoadFormById" class="cinema-form__load-by-id__form">
        <ElInput v-model="id" size="mini" placeholder="ID фильма"/>
        <ElButton icon="el-icon-download" size="mini" type="success" @click="() => loadFilmFromApi()" />
      </div>
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Название:</span>
      <ElInput v-model="form.name" placeholder="Название" />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Оригинальное название:</span>
      <ElInput v-model="form.originName" placeholder="Оригинальное название" />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Описание:</span>
      <ElInput 
        v-model="form.description" 
        placeholder="Описание" 
        :autosize="{ minRows: 2, maxRows: 10 }"
        type="textarea"
      />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Тип:</span>
      <div>
        <ElSelect v-model="form.type" class="w-100" placeholder="Тип">
          <ElOption
            v-for="filter in filterTypes"
            :key="filter.value"
            :label="filter.label"
            :value="filter.value"
          />
        </ElSelect>
      </div>
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Год:</span>
      <ElDatePicker
        v-model="form.year"
        type="year"
        placeholder="Год"
        value-format="yyyy"
        style="width: 100%"
      />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Ссылка на обложку:</span>
      <ElInput v-model="form.previewUrl" placeholder="Ссылка на обложку" />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Кинопоиск ID:</span>
      <ElInput v-model="form.kinopoiskId" placeholder="Кинопоиск ID" />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Оценка фильма<span v-if="form.score"> ({{ form.score }})</span>:</span>
      <ElRate v-model="form.score" :colors="getScoreIcons" :max="10" />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Отзыв:</span>
      <ElInput 
        v-model="form.review" 
        placeholder="Отзыв" 
        :autosize="{ minRows: 2, maxRows: 10 }"
        type="textarea"
      />
    </div>
    <div class="cinema-form__field">
      <span class="cinema-form__field__label">Тэги:</span>
      <div>
        <ElSelect 
          v-model="form.tags"
          class="w-100" 
          multiple
          placeholder="Тип">
          <ElOption
            v-for="tag in getAllCinemaTags"
            :key="tag.key"
            :label="tag.title"
            :value="tag.key"
          >
            <div class="cinema-form__field__tag">
              <img class="cinema-form__field__tag__image" :src="tag.image" />
              <span class="cinema-form__field__tag__title">{{ tag.title }}</span>
            </div>
          </ElOption>
        </ElSelect>
      </div>
    </div>
    <div class="cinema-form__submit">
      <ElButton type="success" @click="() => handleClick()">{{ btnText }}</ElButton>

      <ElTag v-if="!editMode && invalidIdKP" type="danger">Такой фильм скорее всего уже есть в списке</ElTag>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const listTypes = [
  {
    value: "",
    label: "Не выбрано"
  },
  {
    value: "SERIAL",
    label: "Сериал"
  },
  {
    value: "FILM",
    label: "Фильм"
  }
]

export default {
  name: 'CinemaForm',
  props: {
    btnText: {
      type: String,
      default: "Применить"
    },
    cinema: {
      type: Object,
      default: () => (null)
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        originName: '',
        description: '',
        year: '',
        previewUrl: '',
        score: null,
        review: '',
        tags: [],
        kinopoiskId: '',
        type: "FILM"
      },
      id: null,
      isVisibleLoadFormById: false
    }
  },
  mounted: function () {
    if (this.cinema) {
      this.form = {
        ...this.form,
        ...this.cinema
      }
    }
  },
  computed: {
    ...mapGetters('cinema', [
      'isAdmin',
      'getFilms',
      "getAllCinemaTags"
    ]),
    getScoreIcons () {
      return ['#99A9BF', '#F7BA2A', '#FF9900']
    },
    filterTypes () {
      return listTypes
    },
    invalidIdKP () {
      console.log(this.form.kinopoiskId)
      if (this.form.kinopoiskId) {
        return this.getFilms.some(i => String(i.kinopoiskId) === String(this.form.kinopoiskId))
      }

      return false
    }
  },
  watch: {
    'form.kinopoiskId': {
      handler () {
        console.log(1)
        this.form = { ...this.form }
      }
    }
  },
  methods: {
    ...mapActions('cinema', [
      'loadFilmById'
    ]),
    handleClick () {
      this.$emit('btnClick', this.form)
    },
    changeVisibleFormById () {
      this.isVisibleLoadFormById = !this.isVisibleLoadFormById
    },
    loadFilmFromApi () {
      this.loadFilmById(this.id)
        .then(data => {
          this.form = {
            ...this.form,
            name: data.nameRu,
            originName: data.nameOriginal,
            description: data.description,
            year: String(data.year),
            previewUrl: data.posterUrlPreview,
            coverUrl: data.coverUrl,
            kinopoiskId: data.kinopoiskId,
            type: data.serial ? 'SERIAL' : 'FILM'
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    }
  }
}
</script>

<style lang="less">
.cinema-form {
  &__field {
    margin-top: 16px;

    &__label {
      font-size: 14px;
      margin-bottom: 2px;
      color: #414141;
    }

    &__tag {
      display: inline-block;

      &__image {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }

      &__title {
        font-size: 16px;
        height: 32px;
        vertical-align: middle;
      }
    }
  }

  &__submit {
    margin-top: 26px;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__load-by-id {
    display: flex;
    gap: 16px;
    margin-top: 10px;

    &__form {
      display: flex;
      gap: 6px;
    }
  }
}
</style>
