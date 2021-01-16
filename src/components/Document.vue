<template>
  <div class="card card-w70">
    <h3 v-if="blocks.lenth === 0">
      Добавьте первый блок, чтобы увидеть результат
    </h3>
    <component
      v-for="item in blocks"
      :key="item.id"
      :is="item.type"
      :content="item.content"
      @up="$emit('up', item.id)"
      @down="$emit('down', item.id)"
      @change="change($event, item.id)"
      @remove="$emit('remove', item.id)"
    ></component>
  </div>
</template>

<script>
import Heading from './Heading'
import Avatar from './Avatar'
import Subtitle from './Subtitle'
import Text from './Text'

export default {
  data() {
    return {}
  },
  emits: ['up', 'down', 'change', 'remove'],
  components: {
    Heading,
    Avatar,
    Subtitle,
    Text,
  },
  props: {
    blocks: Array,
  },
  methods: {
    change($event, id) {
      const value = $event
      this.$emit('change', id, value)
    },
  },
}
</script>
