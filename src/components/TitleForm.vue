<template>
  <form class="form" @click.prevent>
    <h3
      class="form__title"
      v-html="
        currentModal == 'titleModal'
          ? 'Изменить заголовок'
          : currentModal == 'taskTitleModal'
          ? 'Изменить название задачи'
          : ''
      "
    ></h3>
    <div class="form__input">
      <input
        v-model="title"
        class="input"
        type="text"
        :placeholder="
          currentModal == 'titleModal'
            ? 'Введите заголовок'
            : currentModal == 'taskTitleModal'
            ? 'Введите название задачи'
            : ''
        "
      />
    </div>
    <button @click="changeTitle" class="form__btn btn">Изменить</button>
  </form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapMutations({
      setTitle: "setTitle",
      closeModal: "closeModal",
      setTaskData: "setTaskData",
      updateTaskName: "updateTaskName",
    }),
    changeTitle() {
      if (this.currentModal == "titleModal") {
        this.setTitle(this.title);
        this.closeModal();
        this.title = "";
      } else if (this.currentModal == "taskTitleModal") {
        this.setTaskData({
          id: this.taskData.id,
          level: this.taskData.level,
          name: this.title,
        }),
          this.updateTaskName();
        this.closeModal();
        this.title = "";
      }
    },
  },
  computed: {
    ...mapState({
      currentModal: (state) => state.modals.currentModal,
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