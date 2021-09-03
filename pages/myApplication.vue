<template>
  <v-container>
    <v-card
      v-if="myApplication"
      elevation="12"
      shaped
      class="mx-auto my-12"
      max-width="374"
    >
      <v-card-title>My Application </v-card-title>
      <v-card-text>
        <p class="my-4 text-subtitle-1">
          <strong> Name : </strong> {{ myApplication.name }}
        </p>

        <p class="my-4 text-subtitle-1">
          <strong>Speciality:</strong> {{ myApplication.speciality }}
        </p>
        <p class="my-4 text-subtitle-1">
          <strong>Phone: </strong>{{ myApplication.phone }}
        </p>
        <p class="my-4 text-subtitle-1">
          <strong>Email:</strong> {{ myApplication.email }}
        </p>
      </v-card-text>

      <v-card-title class="pt-0">Skills</v-card-title>

      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip
            v-for="skill in myApplication.skills"
            :key="skill.text"
            :title="skill.text"
            >{{ skill.text }}</v-chip
          >
        </v-chip-group>
      </v-card-text>
    </v-card>
    <v-alert v-else outlined type="warning" prominent border="left">
      <v-btn text class="orange--text" to="/"
        >You have not submitted an appication yet, click here to submit a new
        one</v-btn
      >
    </v-alert>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['applicants']),
    myApplication() {
      // const email = this.$fire.auth.currentUser.email
      // eslint-disable-next-line eqeqeq
      const email = this.$fire.auth.currentUser.email
      const myInfo = this.applicants.filter((i) => i.email === email)
      return myInfo[0]
    }
  }
}
</script>

<style lang="scss" scoped></style>
