<template>
  <v-app class="gray">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="primary"
      class="white--text"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="white--text"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer></v-spacer>
      <div v-if="!user">
        <v-btn text to="/auth" color="white">Login / Register</v-btn>
      </div>
      <v-btn v-else text to="/login" color="white" @click="handleSignOut"
        >Sign out</v-btn
      >
      <v-switch
        text
        color="white"
        rounded
        class="pt-5 mx-2 white--text"
        :append-icon="
          $vuetify.theme.dark
            ? 'mdi-white-balance-sunny'
            : 'mdi-moon-waxing-crescent'
        "
        @click="toggleTheme"
      ></v-switch>
    </v-app-bar>
    <v-main>
      <v-snackbar
        v-model="snackbar"
        transition="fade-transition"
        absolute
        bottom
        center
        color="blue"
        class="white--text"
      >
        {{ snackbarText }}
      </v-snackbar>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app color="primary">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Apply Now',
          to: '/'
        },
        {
          icon: 'mdi-cog',
          title: 'Dashboard',
          to: '/admin'
        }
      ],
      miniVariant: false,
      title: 'Recruitment Management System'
    }
  },
  computed: {
    ...mapState(['user', 'snackbarText']),
    snackbar: {
      get() {
        return this.$store.state.snackbar
      },
      set(v) {
        this.$store.commit('SHOW_SNACKBAR', v)
      }
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    handleSignOut() {
      this.$store.dispatch('signout')
    }
  }
}
</script>
