<template>
  <v-app>
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
      <v-btn text to="/login" color="white">Login</v-btn>
      <v-btn text to="/register" color="white">Register</v-btn>
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
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
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
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
