<template>
  <button class="add_new"><slot></slot></button>
</template>

<script>
export default {
  name: "buttonAddNew",
}
</script>

<style scoped>
.add_new:hover {
  cursor: pointer;
  color: aquamarine;
}
button {
  background: white;
  border: none;
  padding: 5px;
}
</style>
