<template>
  <div class="avatar block-wrap" v-if="!editMode">
    <img :src="content" />
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

<style>
.avatar {
  display: flex;
  justify-content: center;
}
.avatar img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
