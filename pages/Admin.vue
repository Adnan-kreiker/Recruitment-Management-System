<template>
  <v-card elevation="12">
    <v-row>
      <v-col>
        </v-card-title>
                <v-text-field
              v-model="search"
              label="Search"
              class="px-4"
            ></v-text-field>
      </v-col>
      <v-col>
        <v-select
            v-model="selectedStatus"
            :items="selectStatus"          
            label="Filter by Status"
              class="px-4"

          ></v-select>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="applicants"
      item-key="name"
      sort-by="id"
      class="elevation-1"
      :items-per-page="5"
      :search="search"
      :loading="!applicants.length"
      loading-text="Loading... Please wait"
    >
      <template #top>
        <v-toolbar height="10" flat>
          <!-- <v-toolbar-title>Applicants</v-toolbar-title> -->
          <v-divider class="mx-4" inset vertical></v-divider>
           <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="Id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        type="email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.status"
                        :items="applicationStatus"
                        label="Select the status of the application"
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this application?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip
          small
          :color="statusColor[item.status]"
          class="font-weight-medium"
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon
        ><v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapMultiRowFields } from 'vuex-map-fields'

export default {
  data: () => ({
    statusColor: {
      Accepted: 'success',
      Rejected: 'error',
      Created: 'warning',
      Completed: 'info'
    },
    dialog: false,
    search: '',
    selectedStatus: 'All',
    dialogDelete: false,
    applicationStatus: ['Created', 'Completed', 'Accepted', 'Rejected'],
    selectStatus: [ 'All', 'Created', 'Completed', 'Accepted', 'Rejected'],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      email: '',
      phone: '',
      status: ''
    },
    defaultItem: {
      id: '',
      name: '',
      email: '',
      phone: '',
      status: ''
    },
    item: ''
  }),
  computed: {
        headers() {
          return [
      {
        text: 'Id',
        align: 'start',
        sortable: true,
        value: 'id',
        filterable: true
      },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Status', value: 'status', filter: value => {
        if (!this.selectedStatus) {
          return true;
        }
        if (this.selectedStatus === 'All') {
          return true;
        }
        return value === this.selectedStatus
      } },
      { text: 'Actions', value: 'actions', sortable: false }
    ]},
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    ...mapMultiRowFields(['applicants'])
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },
  created() {
    this.$store.dispatch('getApplicants')
  },

  methods: {
    editItem(item) {
      this.item = item // this refers to the item we clicked on
      this.editedIndex = this.applicants.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.item = item
      this.editedIndex = this.applicants.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // this.applicants.splice(this.editedIndex, 1)
      this.$store.commit('deleteItem', this.item)
      // this.applicants.filter((i) => i.id !== this.item.id)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.applicants[this.editedIndex], this.editedItem)
      } else {
        this.applicants.push(this.editedItem)
      }
      this.close()
    },
    statusFilter (value) {
                if (!this.selectedStatus) {
          return true;
        }
        return value === this.selectedStatus
      }
  }
}
</script>
