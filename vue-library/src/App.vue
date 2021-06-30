<template>
  <ag-grid-vue></ag-grid-vue>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {AgGridVue} from './AgGridVue'

@Options({
  components: {
    AgGridVue
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
