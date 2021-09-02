<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-container>
      <v-card max-width="500" class="pa-5 mx-auto">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:30"
          >
            <v-text-field
              v-model="name"
              :counter="30"
              :error-messages="errors"
              label="Name"
              prepend-icon="mdi-account"
              required
              color="secondary"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="phone"
            :rules="{
              required: true,
              min: 7
            }"
          >
            <v-text-field
              v-model="phone"
              :error-messages="errors"
              label="Phone Number"
              required
              prepend-icon="mdi-phone"
              color="secondary"
            ></v-text-field>
          </validation-provider>
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
            rules="required|password:@confirm"
            name="password"
          >
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Password "
              type="password"
              color="secondary"
              prepend-icon="mdi-key"
            >
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="confirm"
            rules="required"
          >
            <v-text-field
              v-model="confirmation"
              :error-messages="errors"
              label="Confirmation"
              required
              type="password"
              color="secondary"
              prepend-icon="mdi-lock"
            >
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="checkbox"
          >
            <v-checkbox
              v-model="checkbox"
              :error-messages="errors"
              value="1"
              label="Agree to our TOS"
              type="checkbox"
              color="secondary"
              required
            ></v-checkbox>
          </validation-provider>
          <v-btn
            class="mr-4"
            :loading="loading"
            type="submit"
            :disabled="invalid"
            color="primary"
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

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match'
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
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmation: '',
    checkbox: null,
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
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    },
    clear() {
      this.name = ''
      this.phone = ''
      this.email = ''
      this.password = ''
      this.confirmation = ''
      this.checkbox = null
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
