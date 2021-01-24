<template>
  <form class="card" @submit.prevent="create">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" required v-model="newTask.title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" required v-model="newTask.date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" required v-model="newTask.desc"></textarea>
    </div>

    <button class="btn primary" :disabled="isDisabled">Создать</button>
  </form>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    let newTask = reactive({
      title: '',
      date: '',
      desc: '',
      status: 'active',
    })
    const router = useRouter()
    const store = useStore()

    function create() {
      const task = newTask
      const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }

      function getDate(str) {
        let date = new Date(str)
        return date.toLocaleString('ru', options)
      }

      const currentDate = new Date().toLocaleString('ru', options)

      newTask.date = getDate(newTask.date)

      currentDate > newTask.date
        ? (newTask.status = 'cancelled')
        : (newTask.status = 'active')

      store.dispatch('addTask', task)

      newTask.title = ''
      newTask.date = ''
      newTask.desc = ''
      newTask.status = ''

      router.replace('/tasks')
    }

    let isDisabled = computed(() => {
      return newTask.title !== '' && newTask.date !== '' && newTask.desc !== ''
        ? false
        : true
    })

    return {
      newTask,
      create,
      isDisabled,
    }
  },
  // data() {
  //   return {
  //     newTask: {
  //       title: '',
  //       date: '',
  //       desc: '',
  //       status: 'active',
  //     },
  //   }
  // },
  // computed: {
  //   isDisabled() {
  //     return this.newTask.title !== '' &&
  //       this.newTask.date !== '' &&
  //       this.newTask.desc !== ''
  //       ? false
  //       : true
  //   },
  // },
  // methods: {
  //   create() {
  //     const task = this.newTask
  //     const options = {
  //       day: 'numeric',
  //       month: 'numeric',
  //       year: 'numeric',
  //     }

  //     function getDate(str) {
  //       let date = new Date(str)
  //       return date.toLocaleString('ru', options)
  //     }

  //     const currentDate = new Date().toLocaleString('ru', options)

  //     this.newTask.date = getDate(this.newTask.date)

  //     currentDate > this.newTask.date
  //       ? (this.newTask.status = 'cancelled')
  //       : (this.newTask.status = 'active')

  //     this.$store.dispatch('addTask', task)

  //     this.newTask.title = ''
  //     this.newTask.date = ''
  //     this.newTask.desc = ''
  //     this.newTask.status = ''
  //     this.$router.replace('/tasks')
  //   },
  // },
}
</script>
