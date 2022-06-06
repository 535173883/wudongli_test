<template>
  <div class="content"><Map></Map></div>
</template>

<script>
import Map from "../../components/Map.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HomePage",
  components: { Map },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
}
</style>
