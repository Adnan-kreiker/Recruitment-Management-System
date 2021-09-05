<template>
  <v-card
    v-if="myApplication"
    elevation="12"
    shaped
    class="mx-auto my-12"
    max-width="374"
  >
    <v-card-title>My Application </v-card-title>
    <v-divider name="divider" class="mx-4 red--text"></v-divider>
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
    <v-divider name="divider" class="mx-4 red--text"></v-divider>

    <v-card-title class="">Skills</v-card-title>

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
  <v-alert
    v-else
    class="mt-12 mx-auto"
    height="auto"
    outlined
    max-width="630"
    type="warning"
    prominent
    border="left"
  >
    <p text class="orange--text">
      You have not submitted an appication yet, click the button to submit a new
      one
    </p>
    <v-btn text to="/" color="orange white-text">New Application</v-btn>
  </v-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['applicants']),
    myApplication() {
      // eslint-disable-next-line eqeqeq
      const uid = this.$fire.auth.currentUser.uid
      const myInfo = this.applicants.filter((i) => i.uid === uid)
      return myInfo[0]
    }
  }
}
</script>

<style lang="scss" scoped></style>
