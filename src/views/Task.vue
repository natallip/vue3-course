<template>
  <div v-if="task" class="card">
    <h2>{{ task.title }}</h2>
    <p>
      <strong>Статус</strong>:
      <AppStatus :status="task.status" />
    </p>
    <p><strong>Дэдлайн</strong>: {{ task.date }}</p>
    <p><strong>Описание</strong>: {{ task.desc }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">
        Взять в работу
      </button>
      <button class="btn primary" @click="changeStatus('done')">
        Завершить
      </button>
      <button class="btn danger" @click="changeStatus('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 v-else v-cloak class="text-white center">
    Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: { AppStatus },
  setup() {
    const route = useRoute()
    const store = useStore()
    const task = computed(() => {
      const tasks = store.getters.getTasks
      return tasks.find((e) => e.id == route.params.id)
    })

    function changeStatus(status) {
      if (task.value.status == status) {
        return
      }
      store.dispatch('changeStatus', {
        id: task.value.id,
        status: status,
      })
    }

    onMounted(store.dispatch('loadTasks'))

    return {
      task: task,
      changeStatus,
    }
  },
  // computed: {
  //   task() {
  //     const tasks = this.$store.getters.getTasks
  //     return tasks.find((e) => e.id == this.$route.params.id)
  //   },
  // },
  // methods: {
  //   changeStatus(status) {
  //     if (this.task.status == status) {
  //       return
  //     }
  //     this.$store.dispatch('changeStatus', {
  //       id: this.task.id,
  //       status: status,
  //     })
  //   },
  // },
  // mounted() {
  //   this.$store.dispatch('loadTasks')
  // },
}
</script>
