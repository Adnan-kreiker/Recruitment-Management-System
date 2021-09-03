<template>
  <main>
    <div class="d-flex justify-center mt-4">
      <v-btn
        text
        :class="login ? 'activeBtn' : ''"
        @click=";[(currentComponent = 'Login'), (login = true)]"
        >login</v-btn
      >
      <v-btn
        text
        :class="!login ? 'activeBtn' : ''"
        exact-active-class="green"
        @click=";[(currentComponent = 'Register'), (login = false)]"
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
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
