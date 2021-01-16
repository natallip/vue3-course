<template>
  <div class="container column">
    <CreateBlock @newBlock="addBlock" />
    <Document
      :blocks="blocks"
      @up="upBlock"
      @down="downBlock"
      @change="editBlock"
      @remove="removeBlock"
    />
  </div>
  <div class="container">
    <Comments />
  </div>
</template>

<script>
import CreateBlock from './components/CreateBlock'
import Document from './components/Document'
import Comments from './components/Comments'
import axios from 'axios'

export default {
  data() {
    return {
      blocks: [],
      comments: [],
    }
  },
  components: {
    CreateBlock,
    Document,
    Comments,
  },
  methods: {
    async addBlock(type, content) {
      const data = JSON.stringify({ type, content })
      await axios.post(
        'https://vue-dz2-default-rtdb.firebaseio.com/blocks.json',
        data
      )
      this.blocks.push({ type, content })
    },
    async loadBlocks() {
      const { data } = await axios.get(
        'https://vue-dz2-default-rtdb.firebaseio.com/blocks.json'
      )
      this.blocks = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        }
      })
    },
    async upBlock(id) {
      if (id === this.blocks[0].id) {
        return
      }
      const ind1 = this.blocks.findIndex((el) => {
        return el.id === id
      })

      let temp = Object.assign({}, this.blocks[ind1 - 1])
      let el1 = this.blocks[ind1]
      let el2 = this.blocks[ind1 - 1]
      const id2 = this.blocks[ind1 - 1].id

      await axios.patch(
        `https://vue-dz2-default-rtdb.firebaseio.com/blocks/${id}.json`,
        { type: el2.type, content: el2.content }
      )
      await axios.patch(
        `https://vue-dz2-default-rtdb.firebaseio.com/blocks/${id2}.json`,
        { type: el1.type, content: el1.content }
      )

      el2.type = el1.type
      el2.content = el1.content
      el1.type = temp.type
      el1.content = temp.content
    },
    async downBlock(id) {
      if (id === this.blocks[this.blocks.length - 1].id) {
        return
      }
      const ind1 = this.blocks.findIndex((el) => {
        return el.id === id
      })
      let temp = Object.assign({}, this.blocks[ind1 + 1])
      let el1 = this.blocks[ind1]
      let el2 = this.blocks[ind1 + 1]
      const id2 = this.blocks[ind1 + 1].id

      await axios.patch(
        `https://vue-dz2-default-rtdb.firebaseio.com/blocks/${id}.json`,
        { type: el2.type, content: el2.content }
      )
      await axios.patch(
        `https://vue-dz2-default-rtdb.firebaseio.com/blocks/${id2}.json`,
        { type: el1.type, content: el1.content }
      )

      el2.type = el1.type
      el2.content = el1.content
      el1.type = temp.type
      el1.content = temp.content
    },
    async editBlock(id, value) {
      await axios.patch(
        `https://vue-dz2-default-rtdb.firebaseio.com/blocks/${id}.json`,
        { content: value }
      )
      this.blocks.map((block) => {
        if (block.id === id) {
          block.content = value
        }
      })
    },
    async removeBlock(id) {
      await axios.delete(
        `https://vue-dz2-default-rtdb.firebaseio.com/blocks/${id}.json`
      )
      this.blocks = this.blocks.filter((block) => {
        return block.id !== id
      })
    },
  },
  mounted() {
    this.loadBlocks()
  },
}
</script>
