<template>
  <div>
    <v-menu offset-y>
        <template #activator="{on, attrs}">
          <v-btn class="ma-4" v-bind="attrs" v-on="on"><v-icon>mdi-sort-variant</v-icon>表示</v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="view">
            <v-list-item value="trend">
              <v-list-item-title>トレンド</v-list-item-title>
            </v-list-item>
            <v-list-item value="new">
              <v-list-item-title>最新の投稿</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    <v-col align="center">
      <ItemCard v-for="(item, i) in $store.getters.entries" :key="i" :entry="item" class="my-8" />
      <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="loadMore" />
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      view: this.$route.query.view ? this.$route.query.view : "trend"
    }
  },
  async fetch() {
    const size = this.$store.getters.entries.length + 10
    
    while (this.$store.getters.entries.length <= size) {
      await this.$store.dispatch('getEntries', this.view)
      await sleep(300)
    }
    
    (this as any).$refs?.infiniteLoading.stateChanger.loaded()
  },
  watch: {
    view() {
      this.$store.commit("clearEntries")
      this.$fetch()
      this.$router.push("/?view=" + this.view)
    }
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