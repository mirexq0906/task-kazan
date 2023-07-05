<template>
  <button class="btn" @click="downloadProject">Скачать проект</button>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    downloadProject() {
      // Экспорт данных из sessionStorage
      const exportedData = JSON.stringify(sessionStorage);


      // Создание ссылки на скачивание файла
      const url = URL.createObjectURL(new Blob([exportedData], { type: 'application/json' }));

      console.log(url)

      // Создание ссылки и автоматическое скачивание файла
      const link = document.createElement('a');
      link.href = url;
      link.download = `${this.title.length ? this.title : 'empty'}.json`;
      link.click();

      // Очистка ссылки после скачивания
      URL.revokeObjectURL(url);
    },
  },
    computed: {
    ...mapState({
      title: (state) => state.title,
    }),
  },
};
</script>

<style scoped lang="scss">

</style>