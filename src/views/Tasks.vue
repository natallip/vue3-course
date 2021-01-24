<template>
  <h1 v-if="tasks.length === 0" v-cloak class="text-white center">
    Задач пока нет
  </h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>

    <div class="card" v-for="(item, i) in tasks" :key="i">
      <h2 class="card-title">
        {{ item.title }}
        <AppStatus :status="item.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ item.date }}
          </small>
        </strong>
      </p>
      <!-- <button class="btn primary" @click="showDesc">Посмотреть</button> -->
      <router-link :to="'/task/' + item.id" class="btn primary"
        >Посмотреть</router-link
      >
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { AppStatus },
  setup() {
    const store = useStore()
    onMounted(store.dispatch('loadTasks'))

    const tasks = computed(() => {
      return store.getters.getTasks
    })
    const activeTasks = computed(() => store.getters.getActive)

    return {
      tasks: tasks,
      activeTasks: activeTasks,
    }
  },
  // computed: {
  //   tasks() {
  //     return this.$store.getters.getTasks
  //   },
  //   activeTasks() {
  //     return this.$store.getters.getActive
  //   },
  // },
  // mounted() {
  //   this.$store.dispatch('loadTasks')
  // },
}
</script>
