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
        <v-btn v-bind="attrs" text v-on="on"><v-icon>mdi-sort-variant</v-icon>表示</v-btn>
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
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="false"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} chikach / powered by <a href="https://www.hoyolab.com" target="_blank">HoYoLAB</a> / <a href="https://github.com/chika3742/hoyolab-ja" target="_blank">Source code</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'HoYoLAB 記事一覧ページ (非公式)'
    }
  },
  computed: {
    view: {
      get() {
        return this.$store.getters.view
      },
      set(value) {
        this.$store.commit("setView", value)
        this.$nuxt?.$emit('changeView', value)
      },
    }
  },
}
</script>

<style>
.cn-select {
  width: 300px;
}
</style>