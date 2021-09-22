<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer/>
      <v-menu offset-y>
        <template #activator="{on, attrs}">
          <v-btn v-bind="attrs" text :disabled="loading" v-on="on"><v-icon>mdi-sort-variant</v-icon>表示</v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="view" mandatory>
            <v-list-item value="trend">
              <v-list-item-title>トレンド</v-list-item-title>
            </v-list-item>
            <v-list-item value="new">
              <v-list-item-title>最新の投稿</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-btn class="mr-0" :loading="loading" icon @click="refresh"><v-icon>mdi-refresh</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-fab-transition>
      <v-btn v-show="!hideUp" fab small class="cn-top-btn" @click="scrollUp"><v-icon>mdi-arrow-up</v-icon></v-btn>
    </v-fab-transition>
    <v-footer
      :absolute="false"
      app
    >
      <span>powered by <a href="https://www.hoyolab.com" target="_blank">HoYoLAB</a> | <a href="https://github.com/chika3742/hoyolab-ja" target="_blank">本サイトについて</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import {scrollTo} from 'scroll-js'

export default {
  data () {
    return {
      title: 'HoYoLAB 酒場記事リスト',
      hideUp: true,
      loading: true,
    }
  },
  computed: {
    view: {
      get() {
        return this.$store.getters.view
      },
      set(value) {
        this.$store.commit("setView", value)
        this.$nuxt?.$emit('changeView')
      },
    },
  },
  created() {
    this.$nuxt.$on('setLoading', (value) => {
      this.loading = value
    })
  },
  mounted() {
    window.onscroll = () => {
      if (window.scrollY < 500) this.hideUp = true
      else this.hideUp = false
    }
  },
  methods: {
    scrollUp() {
      scrollTo(window, {top: 0, easing: 'ease-in-out'})
    },
    refresh() {
      this.$nuxt?.$emit('changeView')
    }
  }
}
</script>

<style>
.cn-select {
  width: 300px;
}
.cn-top-btn {
  position: fixed;
  right: 16px;
  bottom: 32px;
}
a {
  color: #438bfe !important
}
</style>