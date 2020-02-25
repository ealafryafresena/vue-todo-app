import UserService from "@/services/UserService";

const state = {
  users: []
};

const mutations = {
  SET_USERS: (state, users) => (state.users = users),
  ADD_USER: (state, user) => state.users.push(user)
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await UserService.getUsers();
    commit("SET_USERS", response.data);
  },
  async createUser({ commit }, user) {
    const response = await UserService.postUser(user);
    commit("ADD_USER", response.data);
  }
};

const getters = {
  users: state => state.users
};

const users = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default users;
