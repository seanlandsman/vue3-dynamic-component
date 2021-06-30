<template>
  <div>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">

export default {
  created() {
    console.log("LENG ~ created", this);
  },
  mounted() {
    console.log("LENG ~ mounted", this);
  },
  updated() {

  },
  destroyed() {
  },
  methods: {
    onTest() {
      console.warn("LENG ~ onTest", this);
    }
  }
}
</script>
