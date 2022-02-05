<template>
  <ul class="string">
    <li class="input">
      <input @blur="changeCell(indexStr,index,cont)"  v-model="cont" type="text"/>
    </li>
    <li class="button" v-if="header===true">
      <Button @click.native="delColumn(index)" v-if="index!==0">-</Button>
    </li>
    <li class="button" v-if="header===true">
      <Button @click.native="addColumn(index)">+</Button>
    </li>
  </ul>
</template>

<script>
import Button from "@/components/ButtonAddDel"

export default {
  name: "String",
  props: ['index', 'content', "header",'indexStr'],
  components: {
    Button
  },
  inject: ['addColumn','delColumn','changeCell'],
  data() {
    return {
      cont: this.content
    }
  },
  methods: {},
}
</script>

<style scoped>
.string {
  width: 14rem;
}
li {
  border-left: 2px solid black;
  border-right: 2px solid black;
  padding: 2px;
}

input {
  border: none;
  width: 100%;
}

ul {
  display: flex;
  list-style: none;
  flex-flow: row;
}

.button {
  border: none;
}

.input {
  border-right: none;
  width: 15rem;
}
</style>
