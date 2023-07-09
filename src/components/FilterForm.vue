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

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapGetters } from "vuex";
export default defineComponent({
  data() {
    return {
      name: "" as String,
    };
  },
  methods: {
    ...mapMutations(["SET_FILTERS", "CLOSE_MODAL"]),
    addFilter(): void {
      this.SET_FILTERS({
        name: this.name,
        dropdownSort: this.getTaskData.dropdownSort,
        searchQuery: this.getTaskData.searchQuery,
      });
      this.CLOSE_MODAL();
      this.name = "";
    },
  },
  computed: {
    ...mapGetters(["getTaskData"]),
  },
});
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