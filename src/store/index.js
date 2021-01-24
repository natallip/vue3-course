import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      tasks: [],
    }
  },
  getters: {
    getTasks(state) {
      return state.tasks
    },
    getActive(state) {
      const activeTasks = state.tasks.filter((item) => {
        return item.status === 'active'
      })
      return activeTasks.length
    },
  },
  mutations: {
    setTasks(state, data) {
      state.tasks = data
    },
    addTask(state, data) {
      state.tasks.push(data)
    },
    upStatus(state, data) {
      let { id, status } = data
      state.tasks.map((e) => {
        if (e.id == id) {
          e.status = status
        }
      })
    },
  },
  actions: {
    async loadTasks(context) {
      const { data } = await axios.get(
        'https://vue-dz3-a7d45-default-rtdb.firebaseio.com/tasks.json'
      )
      const tasks = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        }
      })
      context.commit('setTasks', tasks)
    },
    async addTask(context, data) {
      const task = JSON.stringify(data)
      await axios.post(
        'https://vue-dz3-a7d45-default-rtdb.firebaseio.com/tasks.json',
        task
      )
      context.commit('addTask', data)
    },
    async changeStatus(context, data) {
      let { id, status } = data
      await axios.patch(
        `https://vue-dz3-a7d45-default-rtdb.firebaseio.com/tasks/${id}.json`,
        { status }
      )
      context.commit('upStatus', data)
    },
  },
  modules: {},
})
