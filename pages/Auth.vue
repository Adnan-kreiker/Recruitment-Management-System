<template>
  <main>
    <div class="d-flex justify-center">
      <v-btn
        text
        :class="login ? 'activeBtn' : ''"
        @click=";[(currentComponent = 'Login'), (login = !login)]"
        >login</v-btn
      >
      <v-btn
        text
        :class="!login ? 'activeBtn' : ''"
        exact-active-class="green"
        @click=";[(currentComponent = 'Register'), (login = !login)]"
        >Register</v-btn
      >
    </div>
    <component :is="currentComponent"> </component>
  </main>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: 'Login',
      login: true
    }
  }
}
</script>

<style lang="scss" scoped>
.activeBtn {
  background: #41b883;
}
</style>
