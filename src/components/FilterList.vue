<template>
  <ul class="list">
    <li
      @click="applyFilter(item)"
      class="item"
      v-for="(item, i) in filters"
      :key="i"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
interface filter {
  name: string;
  dropdownSort: string;
  searchQuery: string;
}
export default defineComponent({
  props: {
    filters: {
      type: Array as () => filter[],
    },
  },
  methods: {
    applyFilter(item: filter) {
      this.$emit("applyFilter", {
        dropdownSort: item.dropdownSort,
        searchQuery: item.searchQuery,
      });
    },
  },
});
</script>

<style scoped lang="scss">
.list {
  display: flex;
  align-items: center;
  gap: 20px;
}
.item {
  padding: 10px;
  background: #525252;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: 200ms opacity;
}
.item:hover {
  opacity: 0.8;
}
</style>