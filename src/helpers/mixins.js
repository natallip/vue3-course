export const mixin = {
  data() {
    return {
      editMode: false,
    }
  },
  emits: ['up', 'down', 'change', 'remove'],
  props: {
    content: String,
  },
  methods: {
    changeValue(data) {
      this.$emit('change', data)
      this.editMode = false
    },
  },
}
