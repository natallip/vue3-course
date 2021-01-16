<template>
  <p v-if="comments.length === 0">
    <button class="btn primary" @click="loadComments">
      Загрузить комментарии
    </button>
  </p>

  <div class="card" v-else>
    <Loader v-if="isLoading" />
    <h2>Комментарии</h2>
    <ul class="list">
      <li class="list-item" v-for="(item, i) in comments" :key="i">
        <div>
          <p><strong>test@microsoft.com</strong></p>
          <small
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
            reiciendis.</small
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Loader from './Loader'

export default {
  data() {
    return {
      isLoading: false,
      comments: [],
    }
  },
  components: {
    Loader,
  },
  methods: {
    async loadComments() {
      this.isLoading = true
      this.comments = await axios.get(
        'https://jsonplaceholder.typicode.com/comments?_limit=42'
      )
      this.isLoading = false
    },
  },
}
</script>
