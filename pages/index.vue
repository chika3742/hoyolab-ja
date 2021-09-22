<template>
  <div>
    <v-col v-if="!error" align="center">
      <ItemCard v-for="(item, i) in $store.getters.entries" :key="i" :entry="item" class="my-8" />
      <v-btn v-if="$store.getters.entries.length != 0" :disabled="loading" @click="loadMore">さらに読み込む</v-btn>
    </v-col>
    <p v-else>{{error}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Main {
  loading: boolean
  error: string | undefined
}

export default Vue.extend({
  data(): Main {
    return {
      loading: false,
      error: undefined
    }
  },
  mounted() {
    this.fetchEntries()
  },
  created() {
    this.$nuxt.$on("changeView", () => {
      this.$store.commit("clearEntries")
      this.$router.push("/?view=" + this.$store.getters.view)
      this.fetchEntries()
    })
  },
  methods: {
    async fetchEntries() {
      this.$nuxt.$emit('setLoading', true)
      const size = this.$store.getters.entries.length + 10
      let count = 0
      while (this.$store.getters.entries.length <= size && count < 5) {
        await this.$store.dispatch('getEntries')
        await sleep(300)
        count++
      }

      if (this.$store.getters.entries.length == 0) this.error = "読み込みに失敗しました。"
      this.loading = false
      this.$nuxt.$emit('setLoading', false)
    },
    loadMore() {
      this.fetchEntries()
      this.loading = true
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

<style>
.v-application {
  font-family: 'Noto Sans JP', sans-serif;
}
</style>