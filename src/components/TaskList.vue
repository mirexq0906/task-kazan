<template>
  <div class="app__list" @dragover="onDragOver" @drop="onDrop">
    <transition-group name="task-list">
      <task-item
        v-for="task in tasks"
        :index="index"
        :key="task.id"
        :task="task"
        :data-task-id="task.id"
        class="app__item"
      />
    </transition-group>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import { mapMutations } from "vuex";
export default {
  components: { TaskItem },
  props: {
    tasks: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      dropTasks: "dropTasks",
    }),
    onDragOver(event) {
      event.preventDefault();
    },
    onDrop(event) {
      event.preventDefault();
      const taskData = JSON.parse(event.dataTransfer.getData("task"));
      const targetElement = event.target.closest(".app__item");
      if (targetElement) {
        const targetId = +targetElement.dataset.taskId;
        this.dropTasks({ taskData: taskData, targetId });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.task-list-item {
  display: inline-block;
  margin-right: 10px;
}
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from {
  transform: translateX(-50px);
}
.task-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.task-list-move {
  transition: transform 1s ease;
}
</style>