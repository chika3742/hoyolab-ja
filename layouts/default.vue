<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
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
      <span>&copy; {{ new Date().getFullYear() }} chikach / powered by HoYoLAB / <a href="https://github.com/chika3742/hoyolab-ja" target="_blank">Source code</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'HoYoLAB 記事一覧ページ (非公式)'
    }
  }
}
</script>
