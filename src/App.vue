<template>
  <section class="app">
    <div class="app__container container">
      <div class="app__box-title">
        <h1 class="app__title">{{ getTitle }}</h1>
        <button
          class="app__title-btn btn"
          @click="OPEN_MODAL({ active: true, name: 'titleModal' })"
        >
          <span>Изменить</span>
          <img src="assets/gear.svg" alt="" />
        </button>
      </div>

      <div class="app__row">
        <button
          class="app__btn btn"
          @click="OPEN_MODAL({ active: true, name: 'taskModal' })"
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
        <button class="app__btn btn" @click="saveFilter">
          Сохранить фильтр
        </button>

        <button
          class="app__btn btn"
          @click="OPEN_MODAL({ active: true, name: 'importModal' })"
        >
          Загрузить проект
        </button>

        <export-app class="app__btn btn" />
      </div>

      <filter-list :filters="getFilters" @apply-filter="applyFilter" />

      <task-list :tasks="sortedAndSearchedPosts" />

      <my-modal>
        <task-form
          v-if="
            getCurrentModal == 'taskModal' || getCurrentModal == 'subTaskModal'
          "
        />
        <title-form
          v-else-if="
            getCurrentModal == 'titleModal' ||
            getCurrentModal == 'taskTitleModal'
          "
        />
        <filter-form v-else-if="getCurrentModal == 'filterModal'" />
        <import-form v-else-if="getCurrentModal == 'importModal'" />
      </my-modal>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TitleForm from './components/TitleForm.vue';
import MyDropdown from './components/UI/MyDropdown.vue';
import MyModal from './components/UI/MyModal.vue';
import { mapMutations, mapGetters } from 'vuex';
import TaskList from './components/TaskList.vue';
import FilterForm from './components/FilterForm.vue';
import FilterList from './components/FilterList.vue';
import ExportApp from './components/ExportApp.vue';
import ImportForm from './components/ImportForm.vue';
import { Task } from './store';

export default defineComponent({
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
      dropdownSort: '' as string,
      searchQuery: '' as string,
      dropdownOptions: [
        { value: 'name', name: 'По названию' },
        { value: 'desc', name: 'По описанию' },
      ] as { value: string; name: string }[],
    };
  },
  computed: {
    ...mapGetters(['getCurrentModal', 'getTitle', 'getTasks', 'getFilters']),
    sortedTasks(): Task[] {
      return [...this.getTasks].sort((task1: Task, task2: Task) =>
        task1[this.dropdownSort]?.localeCompare(task2[this.dropdownSort])
      );
    },
    sortedAndSearchedPosts(): Task[] {
      return this.sortedTasks.filter((task: Task) =>
        task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapMutations(['OPEN_MODAL', 'SET_TASK_DATA']),
    saveFilter(): void {
      this.SET_TASK_DATA({
        dropdownSort: this.dropdownSort,
        searchQuery: this.searchQuery,
      });
      this.OPEN_MODAL({ active: true, name: 'filterModal' });
    },
    applyFilter(item: { dropdownSort: string; searchQuery: string }): void {
      this.dropdownSort = item.dropdownSort;
      this.searchQuery = item.searchQuery;
    },
  },
});
</script>

<style lang="scss">
@import './scss/normalize.scss';
@import './scss/style.scss';
.app {
  padding: 40px 0;
  &__container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);
  }
  &__box-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
    @media (max-width: 575px) {
      margin-bottom: 20px;
    }
  }
  &__title {
    @media (max-width: 575px) {
      font-size: 30px;
    }
  }
  &__title-btn {
    flex-shrink: 0;
    span {
      @media (max-width: 575px) {
        display: none;
      }
    }
    img {
      display: none;
      @media (max-width: 575px) {
        display: block;
        width: 23px;
      }
    }
  }
  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 840px;
    margin: 0 auto;
    gap: 30px;
    margin-bottom: 20px;
    @media (max-width: 575px) {
      gap: 15px;
    }
  }
  &__search {
    width: 300px;
    @media (max-width: 991px) {
      width: 250px;
    }
    @media (max-width: 767px) {
      width: calc(50% - 15px);
    }
    @media (max-width: 575px) {
      width: 100%;
    }
  }
  &__dropdown {
    width: 300px;
    @media (max-width: 991px) {
      width: 250px;
    }
    @media (max-width: 767px) {
      width: calc(50% - 15px);
    }
    @media (max-width: 575px) {
      width: 100%;
    }
  }
  &__btn {
    @media (max-width: 575px) {
      width: 100%;
    }
  }
  &__list {
    margin-top: 50px;
    @media (max-width: 575px) {
      margin-top: 20px;
    }
  }
  &__item:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>