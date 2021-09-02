<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-container>
      <v-card max-width="500" class="pa-5 mx-auto">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="E-mail"
              required
              color="secondary"
              prepend-icon="mdi-email"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required"
          >
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Password "
              type="password"
              prepend-icon="mdi-lock"
              color="secondary"
            >
            </v-text-field>
          </validation-provider>
          <v-btn
            class="mr-4"
            type="submit"
            :disabled="invalid"
            color="primary"
            :loading="loading"
            @click="loader = 'loading'"
          >
            submit
          </v-btn>
          <v-btn color="secondary" outlined @click="clear"> clear </v-btn>
        </form>
      </v-card>
    </v-container>
  </validation-observer>
</template>

<script>
import { required, digits, email, max, min } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})'
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('min', {
  ...min,
  message: '{_field_} must be at least {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: '',
    loader: null,
    loading: false
  }),
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  methods: {
    submit() {
      this.$refs.observer.validate()
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      console.log(payload)
    },
    clear() {
      this.email = ''
      this.password = ''
      this.$refs.observer.reset()
    }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
