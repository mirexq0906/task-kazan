<template>
  <form class="form" @click.prevent>
    <h3 class="form__title">Создать задачу</h3>
    <div class="form__inputs">
      <input
        v-model="name"
        class="input"
        type="text"
        placeholder="Название задачи"
      />
      <textarea
        v-model="desc"
        class="textarea"
        placeholder="Описание задачи"
      ></textarea>
    </div>
    <button @click="createFormTask" class="form__btn btn">
      Создать задачу
    </button>
  </form>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      desc: "",
    };
  },
  methods: {
    ...mapMutations({
      createTask: "createTask",
      setTaskData: "setTaskData",
      closeModal: "closeModal",
    }),
    createFormTask() {
      this.setTaskData({
        id:
          this.currentModal == "taskModal"
            ? null
            : this.currentModal == "subTaskModal"
            ? this.taskData.id
            : "",
        name: this.name,
        desc: this.desc,
      });

      this.createTask();
      this.closeModal();
      this.name = "";
      this.desc = "";
    },
  },
  computed: {
    ...mapState({
      taskData: (state) => state.taskData,
      currentModal: (state) => state.modals.currentModal,
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
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__btn {
    margin-top: 10px;
  }
}
</style>