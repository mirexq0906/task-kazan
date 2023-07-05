<template>
  <div class="task" v-draggable="{ task: task, name: 'task' }">
    <div class="task__header">
      Задача № {{ task.id }} -
      <span v-text="finish ? 'Задача выполнена' : 'Ждет выполнения'"></span>
    </div>
    <div class="task__content">
      <div class="task__box-title">
        <h3 class="task__title">{{ task.name }}</h3>
        <button
          class="btn"
          @click="
            setTaskData({ id: this.task.id });
            openModal({ active: true, name: 'taskTitleModal' });
          "
        >
          Изменить
        </button>
      </div>
      <p class="task__desc">{{ task.desc }}</p>
    </div>
    <div class="task__controls">
      <button
        @click="
          setTaskData({ id: this.task.id });
          openModal({ active: true, name: 'subTaskModal' });
        "
        class="btn"
      >
        Создать задачу
      </button>
      <button
        @click="
          setTaskData({ id: this.task.id });
          deleteTask();
        "
        class="task__btn-delete btn"
      >
        Удалить задачу
      </button>
      <my-checkbox v-model="finish">Задача выполнена</my-checkbox>
    </div>
    <task-item
      v-for="subTask in task.subTasks"
      :key="subTask.id"
      :task="subTask"
      class="task__subtask"
    />
  </div>
</template> 

<script>
import MyCheckbox from "./UI/MyCheckbox.vue";
import { mapMutations } from "vuex";
export default {
  components: { MyCheckbox },
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      finish: this.task.finish,
    };
  },
  methods: {
    ...mapMutations({
      setTaskData: "setTaskData",
      finishTask: "finishTask",
      deleteTask: "deleteTask",
      openModal: "openModal",
    }),
  },
  watch: {
    finish() {
      this.setTaskData({ id: this.task.id, finish: this.finish });
      this.finishTask();
    },
  },
};
</script>

<style scoped lang="scss">
.task {
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
  &__header {
    padding-bottom: 20px;
    border-bottom: 1px solid #323232;
  }
  &__content {
    margin-top: 20px;
  }
  &__box-title {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  &__controls {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #323232;
  }
  &__btn-delete {
    background: #dc3545;
  }
  &__subtask {
    margin-top: 20px;
    box-shadow: none;
    border: 1px solid #323232;
  }
}

.dragging {
  opacity: 0.5;
}
</style>