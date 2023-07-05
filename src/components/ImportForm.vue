<template>
  <form class="form">
    <h3 class="form__title">Загрузить проект</h3>
    <div class="form__import import-form">
      <input
        @change="handleFile"
        class="import-form__disabled"
        id="file"
        type="file"
      />
      <label class="import-form__active" for="file">
        <span class="import-form__active-icon">
          <img src="../assets/arrow-bar-up.svg" alt="" />
        </span>
        <span class="import-form__active-name">{{ selectedFile }}</span>
      </label>
    </div>
    <button @click="importFile" class="form__btn btn">Загрузить</button>
  </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      selectedFile: "Выберите файл",
      file: "",
    };
  },
  methods: {
    ...mapActions({
      updateData: "updateData",
    }),
    ...mapMutations({
      closeModal: "closeModal",
    }),
    handleFile(event) {
      this.file = event.target.files[0];
      this.selectedFile = this.file ? this.file.name : "Выберите файл";
    },
    importFile(e) {
      e.preventDefault();

      if (!this.file) {
        console.log("Файл не выбран.");
        return;
      }
      const reader = new FileReader();

      reader.onload = function (event) {
        const fileContent = event.target.result;

        const jsonData = JSON.parse(fileContent);
        for (var key in jsonData) {
          sessionStorage.setItem(key, jsonData[key]);
        }
      };
      reader.readAsText(this.file);
      window.location.reload();
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    margin-bottom: 20px;
    text-align: center;
  }
  &__btn {
    margin-top: 20px;
    max-width: 202px;
    width: 100%;
  }
}
.import-form {
  &__disabled {
    display: none;
  }
  &__active {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__active-icon,
  &__active-name {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    background: #1bbc9b;
  }
  &__active-icon {
    border-radius: 5px 0 0 5px;
  }
  &__active-icon img {
    width: 30px;
  }
  &__active-name {
    border-radius: 0 5px 5px 0;
    margin-left: 1px;
    color: #fff;
  }
}
</style>