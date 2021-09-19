<template>
  <div>
    <v-col align="center">
      <ItemCard v-for="(item, i) in $store.getters.entries" :key="i" :entry="item" class="my-8" />
      <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="loadMore" />
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async fetch() {
    let count = 0
    const size = this.$store.getters.entries.length + 15
    console.log(size);
    
    while (this.$store.getters.entries.length <= size) {
      count++
      console.log("Try " + count);
      
      await this.$store.dispatch('getEntries')
      await sleep(300)
    }
    
    (this as any).$refs?.infiniteLoading.stateChanger.loaded()
  },
  methods: {
    loadMore() {
      this.$fetch()
    }
  }
})

async function sleep(duration:number) {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration);
  })
}
</script>