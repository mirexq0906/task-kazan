<template>
  <section class="app">
    <div class="container">
      <div class="app__box-title">
        <h1 class="app__title">{{ title }}</h1>
        <button
          @click="openModal({ active: true, name: 'titleModal' })"
          class="app__btn btn"
        >
          Изменить
        </button>
      </div>

      <div class="app__row">
        <button
          @click="openModal({ active: true, name: 'taskModal' })"
          class="app__btn btn"
        >
          Создать задачу
        </button>
        <div class="app__search">
          <input
            v-model="searchQuery"
            class="input"
            type="text"
            placeholder="Поиск..."
          />
        </div>
        <my-dropdown
          v-model="dropdownSort"
          :options="dropdownOptions"
          class="app__dropdown"
        />
        <button @click="saveFilter" class="app__btn btn">
          Сохранить фильтр
        </button>

        <button
          @click="openModal({ active: true, name: 'importModal' })"
          class="btn"
        >
          Загрузить проект
        </button>

        <export-app />
      </div>

      <filter-list :filters="filters" @applyFilter="applyFilter" />

      <task-list :tasks="sortedAndSearchedPosts" />

      <my-modal>
        <task-form
          v-if="currentModal == 'taskModal' || currentModal == 'subTaskModal'"
        />
        <title-form
          v-else-if="
            currentModal == 'titleModal' || currentModal == 'taskTitleModal'
          "
        />
        <filter-form v-else-if="currentModal == 'filterModal'" />
        <import-form v-else-if="currentModal == 'importModal'" />
      </my-modal>
    </div>
  </section>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TitleForm from "./components/TitleForm.vue";
import MyDropdown from "./components/UI/MyDropdown.vue";
import MyModal from "./components/UI/MyModal.vue";
import { mapMutations, mapState } from "vuex";
import TaskList from "./components/TaskList.vue";
import FilterForm from "./components/FilterForm.vue";
import FilterList from "./components/FilterList.vue";
import ExportApp from "./components/ExportApp.vue";
import ImportForm from "./components/ImportForm.vue";
export default {
  components: {
    MyDropdown,
    MyModal,
    TaskForm,
    TitleForm,
    TaskList,
    FilterForm,
    FilterList,
    ExportApp,
    ImportForm,
  },
  data() {
    return {
      dropdownSort: "",
      searchQuery: "",
      dropdownOptions: [
        { value: "name", name: "По названию" },
        { value: "desc", name: "По описанию" },
      ],
    };
  },
  methods: {
    ...mapMutations({
      openModal: "openModal",
      setTaskData: "setTaskData",
    }),
    saveFilter() {
      this.setTaskData({
        dropdownSort: this.dropdownSort,
        searchQuery: this.searchQuery,
      });
      this.openModal({ active: true, name: "filterModal" });
    },
    applyFilter(item) {
      (this.dropdownSort = item.dropdownSort),
        (this.searchQuery = item.searchQuery),
        console.log(this.dropdownSort);
    },
  },
  computed: {
    ...mapState({
      currentModal: (state) => state.modals.currentModal,
      title: (state) => state.title,
      tasks: (state) => state.tasks,
      filters: (state) => state.filters,
    }),
    sortedTasks() {
      return [...this.tasks].sort((task1, task2) =>
        task1[this.dropdownSort]?.localeCompare(task2[this.dropdownSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedTasks.filter((task) =>
        task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss">
@import "./scss/normalize.scss";
@import "./scss/style.scss";
.app {
  padding: 40px 0;
  &__box-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }
  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 840px;
    margin: 0 auto 30px auto;
    gap: 30px;
  }
  &__search {
    width: 300px;
  }
  &__dropdown {
    width: 300px;
  }
  &__list {
    margin-top: 20px;
  }
  &__item:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
