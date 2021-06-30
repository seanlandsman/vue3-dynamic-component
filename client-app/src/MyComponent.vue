<template>
  <span>Hello World!</span>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  components: {
    MyComponent
  },
  data() {
    return {
    }
  }
})
export default class MyComponent extends Vue {}
</script>

<style>

</style>
