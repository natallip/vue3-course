<template>
  <form class="card card-w30" @submit.prevent="createBlock">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="blockType">
        <option value="heading">Заголовок</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="avatar">Аватар</option>
        <option value="text">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model.trim="blockContent"></textarea>
    </div>

    <button class="btn primary" :disabled="isDisabled">Добавить</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isEmpty: true,
      blockType: 'heading',
      blockContent: '',
    }
  },
  emits: ['newBlock'],
  computed: {
    isDisabled() {
      return this.blockContent && this.blockContent.length > 3 ? false : true
    },
  },
  methods: {
    createBlock() {
      this.isEmpty = false
      this.$emit('newBlock', this.blockType, this.blockContent)
      this.blockType = 'heading'
      this.blockContent = null
    },
  },
}
</script>
<style scoped></style>
