<!-- eslint-disable max-len -->
<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
    <div class="w-1/4 overflow-x-auto flex flex-col rounded-md shadow-md bg-blue-400">
      <header class="flex-shrink-0 px-4 py-3 border-b-2">
        <div class="flex justify-center items-center" v-if="item.id">
          <h1 class="font-bold">Editar propiedad</h1>
        </div>
        <div class="flex justify-center items-center" v-else>
          <h1 class="font-bold">Nuevo usuario</h1>
        </div>
      </header>

      <section class="relative py-5 px-2">
        <form @submit.prevent="submit" class="relative">
          <div class="w-full h-full flex flex-col overflow-y-auto space-y-6 px-4 py-6">
            <div class="relative flex flex-col space-y-1">
              <label for="user-name" class="font-body font-bold text-xs text-black capitalize"
                >Usuario</label
              >
              <input
                id="user-name"
                type="text"
                class="py-2 px-3 font-body font-medium text-base text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700"
                tabindex="1"
                required
                v-model="user"
              />
            </div>

            <div class="relative flex flex-col space-y-1">
              <label for="property-type" class="font-body font-bold text-xs text-black capitalize"
                >Tipo de Propiedad</label
              >
              <select
                id="property-type"
                class="w-full py-2 px-3 mb-3 font-body font-medium text-base text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700"
                v-model="typeId"
                :key="`id-property:${id}`"
                required
                tabindex="2"
              >
                <option value="" disabled>Selecciona una opción</option>
                <option
                  v-for="{ id, name } in propertyTypes"
                  :key="`propertyType-${id}`"
                  :value="id"
                  :selected="id === typeId"
                >
                  {{ name }}
                </option>
              </select>
            </div>

            <div class="relative flex flex-col space-y-1">
              <label for="name" class="font-body font-bold text-xs text-black capitalize"
                >Dirección</label
              >
              <input
                id="name"
                type="text"
                class="py-2 px-3 font-body font-medium text-base text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700"
                tabindex="3"
                required
                v-model="name"
              />
            </div>

            <div class="relative flex flex-col space-y-1">
              <label for="rented-from" class="font-body font-bold text-xs text-black capitalize"
                >Comienzo</label
              >
              <input
                id="rented-from"
                name="rentedFrom"
                class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700 sm:text-sm"
                type="date"
                v-model="rentedFrom"
                tabindex="4"
              />
            </div>

            <div class="relative flex flex-col space-y-1">
              <label for="rented-to" class="font-body font-bold text-xs text-black capitalize"
                >Finalización</label
              >
              <input
                id="rented-to"
                name="rentedTo"
                class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-700 focus:border-indigo-700 sm:text-sm"
                type="date"
                v-model="this.rentedTo"
                tabindex="5"
              />
            </div>
          </div>
          <div class="px-4 py-2 flex justify-center" v-if="item.id">
            <button type="submit" class="text-white font-bold py-2 px-4 rounded-full bg-black">
              Actualizar
            </button>
          </div>
          <div class="px-4 py-2 flex justify-center" v-else>
            <button type="submit" class="text-white font-bold py-2 px-4 rounded-full bg-black">
              Crear
            </button>
          </div>
        </form>
      </section>

      <footer class="p-4 border-t-2 border-white flex justify-center">
        <span>
          <button
            type="button"
            class="text-gray-500 font-bold py-2 px-4 rounded-full bg-white"
            @click="close"
          >
            Cerrar
          </button>
        </span>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Modal',
  props: {
    item: {
      type: Object,
    },
    userName: {
      type: String,
    },
    checked: {
      type: Array,
    },
  },
  computed: {
    ...mapState({
      propertyTypes: 'propertyTypes',
    }),
  },
  data() {
    return {
      id: this.item.id,
      name: this.item.name,
      rentedFrom: this.item.rentedFrom,
      rentedTo: this.item.rentedTo,
      typeId: this.item.typeId,
      userId: this.item.userId,
      user: this.userName.userName,
      checkedNames: this.checked,
    };
  },
  methods: {
    cleanData() {
      this.id = '';
      this.name = '';
      this.rentedFrom = '';
      this.rentedTo = '';
      this.typeId = '';
      this.userId = '';
      this.user = '';
    },
    close() {
      this.cleanData();
      this.$emit('close');
    },
    submit() {
      const payload = {
        userId: this.userId,
        typeId: this.typeId,
        name: this.name,
        rentedFrom: this.rentedFrom,
        rentedTo: this.rentedTo,
        userName: this.user,
      };

      if (this.item) {
        this.$store.dispatch('update', ({ props: payload }));
        this.$emit('close');
      } else {
        this.$store.dispatch('create', ({ props: payload }));
        this.$emit('close');
      }
    },
  },
};
</script>
