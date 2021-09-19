<template>
  <v-card width="600" align="left" @click="open">
    <v-row class="ma-0 pa-2 cn-info">
      <img :src="$props.entry.avatar" class="ma-2 cn-avatar" width="50px" height="50px" aspect-ratio="1" />
      <div class="pa-0">
        <p class="ma-0">{{$props.entry.userName}}</p>
        <p class="ma-0">{{$formatDate(new Date($props.entry.createdAt), "yyyy/MM/dd HH:mm")}}</p>
      </div>
    </v-row>
    <v-card-title class="pt-2">{{$props.entry.title}}</v-card-title>
    <v-card-text class="cn-content">{{$props.entry.content}}</v-card-text>
    <v-row class="ma-2">
      <v-img v-for="img in $props.entry.images" :key="img" max-width="27%" class="ma-2 cn-img" aspect-ratio="1" :src="img"/>
    </v-row>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    entry: {
      default: undefined,
      type: Object,
    }
  },
  methods: {
    open() {
      window.open(this.$props.entry.url, '_blank')
    }
  }
})
</script>

<style>
.cn-img {
  border-radius: 4px;
}
.cn-info {
  align-items: center;
}
.cn-avatar {
  border-radius: 50%;
  border: #ddd 2px solid
}
</style>
