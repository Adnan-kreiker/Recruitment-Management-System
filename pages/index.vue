<template>
  <v-container>
    <v-card max-width="500" class="mx-auto">
      <v-card-title class="">
        Please fill your application name...</v-card-title
      >
      <v-row>
        <v-col cols="12" class="py-0">
          <v-card-text>Choose your specialty</v-card-text>
          <v-select
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
            label="Upload your CV"
            append-icon="mdi-file"
            prepend-icon
            class="px-4"
            dense
            solo
          ></v-file-input>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-card-text class="pt-0">Add your skills</v-card-text>
          <v-combobox
            v-model="model"
            :filter="filter"
            :hide-no-data="!search"
            :items="items"
            :search-input.sync="search"
            hide-selected
            label="Search for a skill"
            multiple
            small-chips
            solo
            dense
            class="pa-4"
          >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip
            label
            small
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"    
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon
            small
            @click="parent.selectItem(item)"
          >
            $delete
          </v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
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
      </template>
    </v-combobox>
        </v-col>
      </v-row>
      <v-btn class="ma-4">Submit</v-btn>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    majors: ['Full-stack', 'Front-end', 'Back-end', 'Designer'],
      activator: null,
      attach: null,
      // colors: ['silver'],
      editing: null,
      editingIndex: -1,
      items: [
        { header: 'Select an option or create one' },
        {
          text: 'Vue.js',         
        },
        {
          text: 'HTML',     
        },
        {
          text: 'CSS',      
        },
        {
          text: 'JavaScript',
        },
        {
          text: 'Nuxt.js',
        },
      ],
      nonce: 1,
      menu: false,
      model: [

      ],
      x: 0,
      search: null,
      y: 0,
    }),

    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              // color: this.colors[this.nonce - 1],
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
      },
    },

    methods: {
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .includes(query.toString().toLowerCase()) > -1
      },
    },
  }
</script>
