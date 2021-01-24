<template>
  <span
    :class="{
      badge: true,
      primary: status === 'active' || status === 'done',
      danger: status === 'pending',
      warning: status === 'cancelled',
    }"
    >{{ statusName }}</span
  >
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    status: String,
  },
  setup(props) {
    const status = computed(() => {
      return props.status
    })

    const statusName = computed(() => {
      let name = ''

      switch (props.status) {
        case 'active': {
          name = 'Активен'
          break
        }
        case 'done': {
          name = 'Завершен'
          break
        }
        case 'cancelled': {
          name = 'Отменен'
          break
        }
        case 'pending': {
          name = 'Выполняется'
          break
        }
        default: {
          name = 'Активен'
          break
        }
      }
      return name
    })

    return {
      status,
      statusName,
    }
  },
  // computed: {
  //   statusName() {
  //     let name = ''

  //     switch (this.status) {
  //       case 'active': {
  //         name = 'Активен'
  //         break
  //       }
  //       case 'done': {
  //         name = 'Завершен'
  //         break
  //       }
  //       case 'cancelled': {
  //         name = 'Отменен'
  //         break
  //       }
  //       case 'pending': {
  //         name = 'Выполняется'
  //         break
  //       }
  //       default: {
  //         name = 'Активен'
  //         break
  //       }
  //     }
  //     return name
  //   },
  // },
}
</script>
