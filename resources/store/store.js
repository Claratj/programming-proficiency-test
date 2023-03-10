/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import { users, properties, propertyTypes } from '../mocks/api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    properties,
    users,
    propertyTypes,
  },
  getters: {},
  mutations: {
    create({ typeId, name, rentedFrom, rentedTo, userName }) {
      const propertyItem = {
        id: _createNewIdProperties(),
        userId: _calculateNewUserId(),
        typeId,
        name,
        rentedFrom: rentedFrom ? new Date(rentedFrom) : null,
        rentedTo: rentedTo ? new Date(rentedTo) : null,
      };
      const userItem = {
        id: _calculateNewUserId(),
        name: userName,
      };
      properties.push(propertyItem);
      users.push(userItem);
    },
    update({ id, userId, typeId, name, rentedFrom, rentedTo, userName }) {
      const indexProperty = this.state.properties.findIndex((item) => item.id === id);
      const propertyItem = {
        id,
        userId,
        typeId,
        name,
        rentedFrom: rentedFrom ? new Date(rentedFrom) : null,
        rentedTo: rentedTo ? new Date(rentedTo) : null,
      };
      const userItem = {
        id: userId,
        name: userName,
      };
      properties.splice(indexProperty, 1, propertyItem);
      users.splice(userId, 1, userItem);
    },
    remove(id) {
      const index = this.state.properties.findIndex((item) => item.id === id);
      this.state.properties.splice(index, 1, id);
    },
  },
  actions: {
    create({ commit }, payload) {
      commit('create', payload);
      return payload;
    },
    update({ commit }, payload) {
      commit('update', payload);
      return payload;
    },
    remove({ commit }, { id }) {
      commit('remove', id);
    },
  },
  // plugins: [
  //   createPersistedState({
  //     storage: window.localStorage,
  //     paths: ['state.properties', 'state.users'],
  //   }),
  // ],
});

export default store;

// Lo he llamado con underscore para indicar que es una función interna.
// eslint-disable-next-line no-underscore-dangle
function _calculateNewUserId() {
  const lastId = users.length;
  return lastId + 1;
}

// Lo he llamado con underscore para indicar que es una función interna.
// eslint-disable-next-line no-underscore-dangle
function _createNewIdProperties() {
  const lastId = properties.length;
  return lastId + 1;
}
