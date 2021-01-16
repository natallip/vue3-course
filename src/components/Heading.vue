<template>
  <div class="block-wrap" v-if="!editMode">
    <h1>{{ content }}</h1>
    <EditBtns
      @up="$emit('up')"
      @down="$emit('down')"
      @change="editMode = true"
      @remove="$emit('remove')"
    />
  </div>
  <EditValue v-else :value="content" @changeValue="changeValue" />
</template>

<script>
import EditBtns from './EditBtns'
import EditValue from './EditValue'
import { mixin } from '../helpers/mixins.js'

export default {
  mixins: [mixin],
  components: {
    EditBtns,
    EditValue,
  },
}
</script>
