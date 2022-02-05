<template>
  <div class="string">
    <div v-for="string of this.dataTable" :key="string">
      <Cell :content="string.content" :order="string.order"/>
    </div>
    </div>
</template>

<script>
import Cell from "@/components/Cell";

export default {
  name: 'Table',
  components: {Cell},
  data() {
    return {
      dataTable: [{
        'order': 1,
        'content': "firstBlock"
      }, {'order': 2, 'content': "secondBlock"}]//массив из массивов строк
    }
  }
}
</script>

<style scoped>
.string {
  border: 2px solid black;
  height: 100%;
  display: flex;
  flex-flow: row;
}

ul {
  list-style: none;
  display: flex;
  flex-flow: row;
  margin: 0;
  padding: 0;
}
</style>
