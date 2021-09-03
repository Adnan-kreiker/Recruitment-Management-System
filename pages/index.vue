<template>
  <div>
    <new-application-form />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getApplicants')
  }
}
</script>

<style lang="scss" scoped></style>
