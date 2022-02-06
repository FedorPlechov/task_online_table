<template>
  <div class="str" ref="string">
    <div v-for="(string,index) in this.dataString" :key="string.id" >
      <Cell :content="string.content" :index="index" :header="header" :indexStr="indexStr"/>
    </div>
    <Button class='del'  v-if="header===false" @click="deleteCurrentString({indexString:indexStr,quantityStrings})">del</Button>
  </div>
</template>

<script>
import Cell from "@/components/Cell";

export default {
  name: 'String',
  components: {Cell},
  props: ['dataString','header','indexStr','quantityStrings'],
  inject:['deleteCurrentString']
}
</script>

<style scoped>
.str {
  border: 2px solid black;
  height: 100%;
  display: flex;
  flex-flow: row;
  position: relative;
}
.del {
  background: none;
  border: none;
  position: absolute;
  right: -1.5rem;
  top: 3px;
}
.del:hover {
  color:red;
  cursor: pointer;
}
</style>
