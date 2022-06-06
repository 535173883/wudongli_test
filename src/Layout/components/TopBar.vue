<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="navbarHandleSelect"
      background-color="#ffffff"
      text-color="#45aeea"
      active-text-color="#334681"
    >
      <el-menu-item v-for="item in _router" :key="item.name" :index="item.path">{{ item.meta.title }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      //activeIndex: "/FunctionMenu",
    };
  },
  computed: {
    _router() {
      return this.router.slice(0, -1);
    },
    activeIndex() {
      return this.router.slice(0, -1)[0].path;
    },
  },
  props: {
    router: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    navbarHandleSelect(key) {
      this.$emit("changeRouter", key);
    },
  },
  mounted() {
    console.log(this.router);
    console.log(this.activeIndex);
  },
};
</script>

<style lang="scss" scoped></style>
