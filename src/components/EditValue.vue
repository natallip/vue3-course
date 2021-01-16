<template>
  <form @submit.prevent="$emit('changeValue', newValue)">
    <textarea rows="3" v-model.trim="newValue"></textarea>
    <button class="btn-edit btn-edit-check" :disabled="isDisabled"></button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newValue: this.value,
    }
  },
  props: {
    value: String,
  },
  computed: {
    isDisabled() {
      return this.newValue && this.newValue.length > 0 ? false : true
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
textarea {
  width: 95%;
}
</style>
