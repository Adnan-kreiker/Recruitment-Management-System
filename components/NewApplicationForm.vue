<template>
  <v-card
    outlined
    max-width="600"
    elevation="12"
    shaped
    class="mx-auto py-8 px-10"
  >
    <v-card-title
      class="
        pt-4
        pb-8
        px-2
        text-subtitle-1 text-sm-h5
        justify-center
        font-weight-medium
        grey--text
        text--darken-1
        font-weight-bold
      "
    >
      Please fill your application</v-card-title
    >
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="addApplication() + showNotification()">
        <v-row>
          <v-col cols="12" class="px-8">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:20"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Name"
                required
                color="secondary"
                class="font-weight-bold"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" class="px-8">
            <validation-provider
              v-slot="{ errors }"
              name="phoneNumber"
              :rules="{
                required: true
              }"
            >
              <v-text-field
                v-model="phoneNumber"
                :error-messages="errors"
                label="Phone Number"
                required
                color="secondary"
                class="font-weight-bold"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col class="px-8" cols="12">
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
                class="font-weight-bold"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-card-text class="text-body-1 font-weight-bold"
              >Choose your specialty</v-card-text
            >
            <v-select
              v-model="specialty"
              class="px-4 font-weight-bold"
              :items="majors"
              label="Your specialty"
              solo
            ></v-select>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-card-text class="pt-0 text-body-1 font-weight-bold"
              >Upload your resume</v-card-text
            >
            <v-file-input
              v-model="file"
              label="Upload your CV"
              append-icon="mdi-file"
              prepend-icon
              class="px-4 font-weight-bold"
              solo
            ></v-file-input>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-card-text class="text-body-1 font-weight-bold"
              >Add your skills</v-card-text
            >
            <v-combobox
              v-model="skills"
              :filter="filter"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search"
              hide-selected
              label="Search for an option"
              multiple
              chips
              solo
              class="px-4"
            >
              <template #no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip label>
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template #selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :input-value="selected"
                  label
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template #item="{ index, item }">
                <v-text-field
                  v-if="editing === item"
                  v-model="editing.text"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn icon @click.stop.prevent="edit(index, item)">
                    <v-icon>{{
                      editing !== item ? 'mdi-pencil' : 'mdi-check'
                    }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-btn class="ma-4" color="primary" type="submit" :disabled="invalid">
          submit
        </v-btn>
        <v-btn class="ma-4" color="secondary" outlined @click="clear">
          clear
        </v-btn>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import { required, email, max, min } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'

setInteractionMode('eager')

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
    majors: ['Full-stack', 'Front-end', 'Back-end', 'Designer'],
    activator: null,
    attach: null,
    name: '',
    email: '',
    phoneNumber: '',
    specialty: '',
    file: null,
    editing: null,
    editingIndex: -1,
    items: [
      { header: 'Select an option or create one' },
      {
        text: 'Nuxt.js'
      },
      {
        text: 'Vue.js'
      },
      {
        text: 'HTML'
      },
      {
        text: 'JavaScript'
      },
      {
        text: 'CSS'
      }
    ],
    nonce: 1,
    menu: false,
    skills: [],
    x: 0,
    search: null,
    y: 0
  }),

  watch: {
    skills(val, prev) {
      if (val.length === prev.length) return

      this.skills = val.map((v) => {
        if (typeof v === 'string') {
          v = {
            text: v
          }

          this.items.push(v)

          this.nonce++
        }

        return v
      })
    }
  },
  unmounted() {
    clearTimeout()
  },
  methods: {
    addApplication() {
      const formOutPut = {
        name: this.name,
        email: this.email,
        phone: this.phoneNumber,
        speciality: this.specialty,
        skills: this.skills,
        file: this.file
      }
      this.$store.commit('addApplicant', formOutPut)
      this.$router.push('/myapplication')
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = (val) => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return (
        text.toString().toLowerCase().includes(query.toString().toLowerCase()) >
        -1
      )
    },
    clear() {
      this.name = ''
      this.phoneNumber = ''
      this.email = ''
      this.checkbox = null
      this.skills = []
      this.$refs.observer.reset()
    },
    showNotification() {
      this.$store.commit('SHOW_SNACKBAR', 'Your Application has been submitted')
      setTimeout(() => {
        this.$store.commit('HIDE_SNACKBAR')
      }, 4000)
    }
  }
}
</script>
