<!-- eslint-disable max-len -->
<template>
  <div id="app" class="relative mt-12">
    <div v-if="users.length === 0">loading...</div>
    <div v-else-if="users.length && propertyTypes.length && properties.length" class="flex flex-col max-w-6xl mx-auto">
      <!-- Start filters -->
      <div class="w-full flex justify-between items-center border-b-2 mb-4 pb-2">
        <div class="flex flex-start space-x-4 py-2 items-center max-w-4xl">
          <h2 class="text-gray-600 font-bold text-lg border-r border-gray-600 py-2 pr-2 mr-2 uppercase h-10">
            Filtros
          </h2>
          <!-- Property type filter -->
          <div class="flex flex-row">
            <select v-model="typeOfProperty"
              class="block w-full h-10 py-2 px-4 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700">
              <option value="" class="h-6 w-4">Tipo de propiedad</option>
              <option v-for="type in this.propertyTypes" :key="`propertyType-id-${type.id}`"
                :id="`property-type-${type.name}`" :value="type.id"
                class="h-6 w-4 border-gray-300 rounded text-gray-800 focus:ring-indigo-700">
                {{ type.name }}
              </option>
            </select>
          </div>

          <!-- Search filter -->
          <div class="flex flex-row">
            <label for="search" class="sr-only">Search</label>
            <input id="search" name="search"
              class="block w-full h-10 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700"
              :placeholder="'search'" type="search" v-model="search" />
          </div>

          <!-- Date filter -->
          <div class="flex flex-row space-x-4">
            <div class="relative flex flex-row space-x-4 items-center max-w-sm">
              <label for="from-date" class="text-sm">Desde:</label>
              <input id="from-date" name="from-date"
                class="block w-full h-10 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700 sm:text-sm"
                type="date" v-model="fromDate" />
              <label for="to-date" class="text-sm">Hasta:</label>
              <input id="to-date" name="to-date"
                class="block w-full h-10 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700"
                type="date" v-model="toDate" />
              <button @click="clearFilters()" class="bg-gray-500 text-white py-1 px-3 rounded-full">
                x
              </button>
            </div>
          </div>
        </div>
        <button @click="isModalVisible = true" class="text-white font-bold py-2 px-4 rounded-full bg-green-500">
          Crear
        </button>
      </div>
      <!-- End filters -->
      <table class="w-full border-collapse rounded-md border-none text-center lg:text-left">
        <thead>
          <tr class="font-bold uppercase lg:text-xs">
            <th v-for="column in columnsNames" :key="column.id" class="py-3 text-gray-600 flex flex-col w-full lg:w-auto border-b lg:table-cell">
              {{ column.columnName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(info, key) in filters" :key="key"
            class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td class="flex flex-col w-full lg:w-auto border-b lg:table-cell">
              {{ getUser(info.userId) }}
            </td>
            <td class="flex flex-col w-full lg:w-auto border-b lg:table-cell">
              {{ getProperty(info.typeId) }}
            </td>
            <td class="flex flex-col w-full lg:w-auto border-b lg:table-cell">
              {{ info.name }}
            </td>
            <td class="flex flex-col w-full lg:w-auto border-b lg:table-cell">
              {{ formatDate(info.rentedFrom) }}
            </td>
            <td class="flex flex-col w-full lg:w-auto border-b lg:table-cell">
              {{ formatDate(info.rentedTo) }}
            </td>
            <td class="flex flex-col w-full lg:w-auto border-b lg:table-cell">
              <span v-if="isCurrentlyRented(info.rentedFrom, info.rentedTo)">Sí</span>
              <span v-else>No</span>
            </td>
            <td class="flex flex-col w-full lg:w-auto border-b lg:table-cell">
              {{ howManyMonths(info.rentedFrom, info.rentedTo) }}
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 border-b text-center block lg:table-cell">
              <span class="flex flex-row justify-end space-x-4">
                <button @click="update(info)" class="font-bold text-blue-700 underline">
                  Editar
                </button>
                <button @click="erase(info)" class="text-white font-bold py-1 px-3 rounded-full bg-red-700">
                  x
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <span>
        {{ JSON.stringify(item) }}
      </span>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal" :item="item" :userName="userName" :checked="arrayChecked"/>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';
import Modal from './components/modal/modal.vue';

export default {
  components: { Modal },
  name: 'App',
  data: () => ({
    columnsNames: [
      {
        id: 1,
        columnName: 'usuario',
      },
      {
        id: 2,
        columnName: 'tipo de propiedad',
      },
      {
        id: 3,
        columnName: 'direccion',
      },
      {
        id: 4,
        columnName: 'comienzo',
      },
      {
        id: 5,
        columnName: 'finalizacion',
      },
      {
        id: 6,
        columnName: 'en alquiler',
      },
      {
        id: 7,
        columnName: 'Tiempo alquilado',
      },
    ],
    search: '',
    typeOfProperty: '',
    fromDate: '',
    toDate: '',
    isModalVisible: false,
    item: {},
    userName: '',
    arrayChecked: ['Mike'],
    fakeItem: {
      id: 2,
      name: 'Flat - Torres Kio',
      rentedFrom: null,
      rentedTo: null,
      typeId: 1,
      userId: 2,
    },
  }),
  computed: {
    ...mapState({
      properties: 'properties',
      users: 'users',
      propertyTypes: 'propertyTypes',
    }),
    filters() {
      return this.properties.filter((property) => {
        // eslint-disable-next-line
        if (this.search || this.typeOfProperty !== '' || this.fromDate && this.toDate) {
          if (this.search) {
            const searchFormatted = this.formatText(this.search);
            const descriptionFormatted = this.formatText(property.name);
            const user = this.getUser(property.userId);
            if (this.formatText(user).includes(searchFormatted)) {
              return property.userId;
            }
            return descriptionFormatted.includes(searchFormatted);
          }
          if (this.typeOfProperty !== '' && this.getProperty(property.typeId) !== this.typeOfProperty) {
            return false;
          }
          if (this.fromDate && this.toDate) {
            return this.filterByDates(property);
          }
          return true;
        }
        return true;
      });
    },
  },
  methods: {
    getUser(userId) {
      return this.users.find((user) => user.id === userId).name;
    },
    getProperty(propertyId) {
      return this.propertyTypes.find((property) => property.id === propertyId).name;
    },
    isCurrentlyRented(rentedFrom, rentedTo) {
      const today = new Date();
      if (rentedFrom <= today && today <= rentedTo) {
        return true;
      }
      if (rentedFrom !== null && rentedTo === null) {
        return true;
      }
      return false;
    },
    formatDate(date) {
      if (date !== null) {
        return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(date);
      }
      return '-';
    },
    formatText(text) {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/ /g, '');
    },
    howManyMonths(rentedFrom, rentedTo) {
      const toCalculateMonths = 1000 * 60 * 60 * 24 * 30.4369;
      if (rentedFrom !== null && rentedTo !== null) {
        const timeDif = rentedTo.getTime() - rentedFrom.getTime();
        const monthsDif = Math.floor(timeDif / toCalculateMonths);
        if (monthsDif < 1) {
          const daysDif = Math.floor(timeDif / (1000 * 60 * 60 * 24));
          return `${daysDif} días`;
        }
        return `${monthsDif} meses`;
      }
      if (rentedFrom !== null && rentedTo === null) {
        const timeDif = new Date().getTime() - rentedFrom.getTime();
        const monthsDif = Math.floor(timeDif / toCalculateMonths);
        if (monthsDif < 1) {
          const daysDif = Math.floor(timeDif / (1000 * 60 * 60 * 24));
          return `${daysDif} días`;
        }
        return `${monthsDif} meses`;
      }
      return '-';
    },
    filterByDates(property) {
      const fromDateFormatted = new Date(this.fromDate);
      const toDateFormatted = new Date(this.toDate);
      return property.rentedFrom >= fromDateFormatted && property.rentedTo <= toDateFormatted;
    },
    clearFilters() {
      this.search = '';
      this.typeOfProperty = '';
      this.fromDate = '';
      this.toDate = '';
    },
    closeModal() {
      this.item = {};
      this.isModalVisible = false;
    },
    update(info) {
      this.item = info;
      this.userName = this.getUser(info.userId);
      this.$nextTick(() => {
        this.isModalVisible = true;
      });
    },
    erase(info) {
      this.$store.dispatch('remove', { props: info.id });
    },
  },
};
</script>
