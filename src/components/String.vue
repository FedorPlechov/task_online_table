<template>
  <div class="str">
    <div v-for="(string,index) in this.dataString" :key="string.id" >
      <Cell :content="string.content" :index="index" :header="header" :indexStr="indexStr"/>
    </div>
  </div>
</template>

<script>
import Cell from "@/components/Cell";

export default {
  name: 'String',
  components: {Cell},
  props: ['dataString','header','indexStr'],
}
</script>

<style scoped>
.str {
  border: 2px solid black;
  height: 100%;
  display: flex;
  flex-flow: row;
}
</style>
