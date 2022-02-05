<template>
  <ul>
    <li>
      <input :value="content" type="text"/>
    </li>
    <li>
      <ButtonAddNew />
    </li>
  </ul>

</template>

<script>
import ButtonAddNew from "@/components/ButtonAddNew"
export default {
  name: "String",
  props: ['order', 'content'],
  components: {
    ButtonAddNew
  },
  methods: {
  }
}
</script>

<style scoped>
li {
  border-left: 2px solid black;
  border-right: 2px solid black;
  padding: 0.5rem;
}

input {
  border: none;
}
</style>
