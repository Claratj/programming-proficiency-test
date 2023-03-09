/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
import { users, properties, propertyTypes } from '../mocks/api';

export const state = () => ({
  propertyItem: {
    id: null,
    userId: null,
    typeId: null,
    name: '',
    rentedFrom: null,
    rentedTo: null,
  },
  userItem: {
    id: null,
    name: '',
  },
  users,
  propertyTypes,
  properties,
});

export const getters = {};

const mutations = {
  RESET() {
    state.propertyItems = {
      id: null,
      userId: null,
      typeId: null,
      name: '',
      rentedFrom: null,
      rentedTo: null,
    };
    state.userItem = {
      id: null,
      name: '',
    };
    state.typeItem = {
      id: null,
      name: '',
    };
  },
  ADD({ typeId, name, rentedFrom, rentedTo, userName }) {
    state.propertyItem = {
      id: _createNewIdProperties(),
      userId: _calculateNewUserId(),
      typeId,
      name,
      rentedFrom: rentedFrom ? new Date(rentedFrom) : null,
      rentedTo: rentedTo ? new Date(rentedTo) : null,
    };
    state.userItem = {
      id: _calculateNewUserId(),
      name: userName,
    };
    properties.push(state.propertyItems);
    users.push(state.userItem);
    this.clean();
  },
  REPLACE({ id, userId, typeId, name, rentedFrom, rentedTo, userName }) {
    const indexProperty = state.properties.findIndex((item) => item.id === id);
    state.propertyItem = {
      id,
      userId,
      typeId,
      name,
      rentedFrom: rentedFrom ? new Date(rentedFrom) : null,
      rentedTo: rentedTo ? new Date(rentedTo) : null,
    };
    state.userItem = {
      id: userId,
      name: userName,
    };
    properties.splice(indexProperty, 1, state.propertyItem);
    users.splice(userId, 1, state.userItem);
    this.clean();
  },
  REMOVE(id) {
    console.log('estoy en el remove', id);
    const index = state.properties.findIndex((item) => item.id === id);
    state.properties.splice(index, 1);
    this.clean();
  },
};

export const actions = {
  clean() {
    mutations.RESET();
  },
  create(payload) {
    mutations.ADD(payload);
    return payload;
  },
  update(payload) {
    mutations.REPLACE(payload);
    return payload;
  },
  remove({ id }) {
    console.log('estoy en actions remove');
    mutations.REMOVE(id);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

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
