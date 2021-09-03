<template>
  <v-app class="gray">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      temporary
      height="100vh"
      color="primary"
      class="white--text overflow-visible"
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
      <v-toolbar-title
        v-if="user"
        class="white--text text-caption text-sm-subtitle-1 pl-4"
      >
        logged in as {{ user.displayName }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <div v-if="!user">
        <v-btn text to="/auth" color="white">Login / Register</v-btn>
      </div>
      <v-btn v-else text to="/login" color="white" @click="handleSignOut"
        ><v-icon> mdi-logout</v-icon></v-btn
      >
      <v-switch
        text
        color="white"
        rounded
        class="pt-5 mx-2 white--text"
        app
        :append-icon="
          $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
        "
        @click="toggleTheme"
      >
      </v-switch>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-snackbar
          v-model="snackbar"
          transition="fade-transition"
          absolute
          bottom
          center
          color="#35495E"
          class="white--text"
        >
          {{ snackbarText }}
        </v-snackbar>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer class="justify-center" :absolute="!fixed" app color="primary">
      <span class="white--text py-2"
        >&copy; {{ new Date().getFullYear() }} Recruitment Management System
      </span>
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
          icon: 'mdi-clipboard-edit-outline',
          title: 'Apply Now',
          to: '/'
        },
        {
          icon: 'mdi-monitor-dashboard',
          title: 'Dashboard',
          to: '/admin'
        },
        {
          icon: 'mdi-note-text-outline',
          title: 'My Application',
          to: '/myapplication'
        }
      ],
      miniVariant: false
    }
  },
  computed: {
    ...mapState(['user', 'snackbarText', 'user']),
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

<style>
.mdi-weather-night::before {
  content: '\F0594';
  color: white;
}
</style>
