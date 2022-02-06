<template>
  <div>
    <div v-for="(item,index) in dataTable" :key="item.order" class="container">
      <div class="order">{{ index === 0 ? '#' : index }}</div>
      <String :dataString="item" :header="index===0" :indexStr="index"></String>
    </div>
    <ButtonAddDel @click.native="deleteString">-</ButtonAddDel>
    <ButtonAddDel @click.native="addString"> +</ButtonAddDel>
  </div>
</template>

<script>
import String from '../String'
import ButtonAddDel from "@/components/ButtonAddDel";

export default {
  name: "Table",
  components: {String, ButtonAddDel},
  inject: ['$socket'],
  data() {
    return {
      dataTable: []
    }
  },
  provide() {
    return {
      addColumn: this.addColumn,
      delColumn: this.deleteColumn,
      changeCell: this.changeCell
    }
  },
  computed: {
    quantityColumns() {
      if (this.dataTable[0]===undefined) {
        return 1;
      }
      return this.dataTable[0].length;
    },
    quantityStrings() {
      return this.dataTable.length;
    }
  },
  methods: {
    addString({flag}) {
      const arr = [];
      this.renderNewString(arr)
      if (flag===true) {
        return;
      }
      this.emitEventToServer('addStr', {
        indexNewStr: this.quantityStrings + 1, string: arr
      })
    },
    deleteString({indexString, flag}) {
      this.dataTable.splice(-1, 1);
      if (this.dataTable[indexString] === undefined && flag) {
        return;
      }
      this.emitEventToServer('deleteString', {
        indexString: this.quantityStrings
      })
    },
    addColumn(index, flag) {
      let arr = [];
      this.dataTable.forEach(item => {
        let obj = {id: Date.now() + Math.random(), content: ''};
        arr.push(obj);
        item.splice(index + 1, 0, obj);
      })
      if (flag === true) {
        return;
      }
      this.emitEventToServer('addColumn', {
        arrayOfCell: arr, indexAddedColumn: index + 1
      })
    },
    deleteColumn(index, flag) {
      this.dataTable.forEach(item => item.splice(index, 1));
      if (flag === true) {
        return;
      }
      this.emitEventToServer('deleteColumn', {
        indexDeletedColumn: index, quantityStrings: this.quantityStrings
      })

    },
    changeCell(indexString, indexColumn, content, flag) {
      this.dataTable[indexString][indexColumn].content = content;
      this.dataTable[indexString][indexColumn].id = Date.now() + Math.random();
      if (flag === true) {
        return;
      }
      this.emitEventToServer('changeCell', {
        indexString: indexString,
        indexColumn: indexColumn,
        content: content,
        id: this.dataTable[indexString][indexColumn].id
      })

    },
    async fetchData() {
      const response = await fetch("http://localhost:3000/table", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to send request.');
      }
      let arr = [];
      responseData.forEach(item => arr[item.indexStr] = item.str)
      this.dataTable = arr;
    },
    renderNewString(arr) {
      for (let i = 0; i < this.quantityColumns; i++) {
        arr[i] = {id: Date.now() + Math.random(), content: ''};
      }
      this.dataTable.push(arr);
    },
    emitEventToServer(event, payload) {
      this.$socket.emit(event, payload);
    }
  },
  beforeMount() {
    this.fetchData()
  },
  created() {

    this.$socket.on("connect", () => {
      console.log(this.$socket.connected); // true
    });

    this.$socket.on("addStr", (payload) => {
      this.addString(payload)
    });
    this.$socket.on("deleteString", (payload) => {
      this.deleteString(payload)
    });
    this.$socket.on("addColumn", (payload) => {
      this.addColumn(payload.indexAddedColumn, payload.flag)
    });
    this.$socket.on("deleteColumn", (payload) => {
      this.deleteColumn(payload.indexDeletedColumn, payload.flag)
    });
    this.$socket.on("changeCell", (payload) => {
      this.changeCell(payload.indexString, payload.indexColumn, payload.content, payload.flag)
    });

  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row;
}

.order {
  padding: 5px;
  width: 2rem;
}
</style>
