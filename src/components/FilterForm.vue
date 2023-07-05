<template>
  <form @click.prevent class="form">
    <h3 class="form__title">Название фильтра</h3>
    <div class="form__input">
      <input
        v-model="name"
        type="text"
        class="input"
        placeholder="Введите название"
      />
    </div>
    <button @click="addFilter" class="form__btn btn">Сохранить</button>
  </form>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapMutations({
      setFilters: "setFilters",
      closeModal: "closeModal",
    }),
    addFilter() {
      this.setFilters({
        name: this.name,
        dropdownSort: this.taskData.dropdownSort,
        searchQuery: this.taskData.searchQuery,
      });
      this.closeModal();
      this.name = "";
    },
  },
  computed: {
    ...mapState({
      taskData: (state) => state.taskData,
    }),
  },
};
</script>

<style scoped lang="scss">
.form {
  &__title {
    margin-bottom: 20px;
    text-align: center;
  }
  &__btn {
    margin-top: 20px;
  }
}
</style>