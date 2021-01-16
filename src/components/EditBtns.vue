<template>
  <div class="btns-wrap">
    <button class="btn-edit btn-edit-up" @click="$emit('up')"></button>
    <button class="btn-edit btn-edit-down" @click="$emit('down')"></button>
    <button class="btn-edit btn-edit-change" @click="$emit('change')"></button>
    <button class="btn-edit btn-edit-remove" @click="$emit('remove')"></button>
  </div>
</template>

<script>
export default {
  emits: ['up', 'down', 'change', 'remove'],
}
</script>

<style>
.btns-wrap {
  display: inline-flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
}
.btn-edit {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
}
.btn-edit-up {
  background-image: url('../assets/up.svg');
  margin-right: 5px;
}
.btn-edit-down {
  background-image: url('../assets/down.svg');
  margin-right: 5px;
}
.btn-edit-change {
  background-image: url('../assets/edit.svg');
  margin-right: 5px;
}
.btn-edit-remove {
  background-image: url('../assets/cancel.svg');
}
.btn-edit-check {
  width: 20px;
  height: 20px;
  background-image: url('../assets/checked.svg');
}
</style>
