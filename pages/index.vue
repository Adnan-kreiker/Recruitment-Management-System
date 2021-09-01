<template>
  <v-container>
    <v-card max-width="700" elevation="12" shaped class="mx-auto">
      <v-card-title class="">
        Please fill your application name...</v-card-title
      >
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="addApplication">
          <v-row>
            <v-col cols="12" sm="6" class="px-8">
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required|max:10"
              >
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :error-messages="errors"
                  label="Name"
                  required
                  color="secondary"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" class="px-8">
              <validation-provider
                v-slot="{ errors }"
                name="phoneNumber"
                :rules="{
                  required: true,
                  min: 7
                }"
              >
                <v-text-field
                  v-model="phoneNumber"
                  :counter="7"
                  :error-messages="errors"
                  label="Phone Number"
                  required
                  color="secondary"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col class="pl-8" cols="12" sm="6">
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
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-card-text>Choose your specialty</v-card-text>
              <v-select
                v-model="specialty"
                class="px-4"
                :items="majors"
                label="Your specialty"
                dense
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-card-text class="pt-0">Upload your resume</v-card-text>
              <v-file-input
                v-model="file"
                label="Upload your CV"
                append-icon="mdi-file"
                prepend-icon
                class="px-4"
                dense
                solo
              ></v-file-input>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-card-text class="py-0">Add your skills</v-card-text>
              <v-combobox
                v-model="skills"
                :filter="filter"
                :hide-no-data="!search"
                :items="items"
                :search-input.sync="search"
                hide-selected
                label="Search for a skill or add your own"
                multiple
                small-chips
                solo
                dense
                class="pa-4"
              >
                <template #no-data>
                  <v-list-item>
                    <span class="subheading">Create</span>
                    <v-chip label small>
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
                    small
                    class="ma-1"
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
                  <v-chip v-else dark label small>
                    {{ item.text }}
                  </v-chip>
                  <v-spacer></v-spacer>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-btn class="ma-4" type="submit" :disabled="invalid"> submit </v-btn>
          <v-btn class="ma-4" @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
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
        text: 'Vue.js'
      },
      {
        text: 'HTML'
      },
      {
        text: 'CSS'
      },
      {
        text: 'JavaScript'
      },
      {
        text: 'Nuxt.js'
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
    model(val, prev) {
      if (val.length === prev.length) return

      this.model = val.map((v) => {
        if (typeof v === 'string') {
          v = {
            text: v
            // color: this.colors[this.nonce - 1],
          }

          this.items.push(v)

          this.nonce++
        }

        return v
      })
    }
  },

  methods: {
    addApplication() {
      const formOutPut = {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        speciality: this.specialty,
        skills: this.skills,
        file: this.file
      }
      this.$store.commit('addApplicant', formOutPut)
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
      this.$refs.observer.reset()
    }
  }
}
</script>

<style lang="scss" scoped></style>
