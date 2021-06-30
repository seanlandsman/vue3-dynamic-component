<template>
  <hr>
  <ag-grid-vue :component="component"/>
  <hr>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {AgGridVue} from 'vue-library';
import MyComponent from "./MyComponent.vue"

@Options({
  components: {
    AgGridVue,
    MyComponent
  },
  data: function () {
    return {
      component: 'MyComponent'
    }
  },
})
export default class App extends Vue {}
</script>

<style>

</style>
