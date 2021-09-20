<template>
  <v-card width="600" align="left" @click="open">
    <v-row class="ma-0 pa-2 pb-0 cn-info">
      <img :src="$props.entry.avatar" class="ma-2 cn-avatar" width="50px" height="50px" aspect-ratio="1" />
      <div class="pa-0">
        <p class="ma-0">{{$props.entry.userName}}</p>
        <p class="ma-0"><span class="cn-date">{{$formatDate(new Date($props.entry.createdAt), "yyyy/MM/dd")}}</span> <span class="cn-time">{{$formatDate(new Date($props.entry.createdAt), "HH:mm")}}</span></p>
      </div>
    </v-row>
    <v-card-title class="py-2 cn-title">{{$props.entry.title}}</v-card-title>
    <v-card-text class="cn-content">{{$props.entry.content}}</v-card-text>
    <v-row v-if="$props.entry.images.length > 0" class="ma-0 pa-2">
      <v-img v-for="img in $props.entry.images" :key="img" max-width="27%" class="ma-2 cn-img" aspect-ratio="1" :src="img"/>
    </v-row>
    <v-row class="ma-0 px-4 pb-4">
      <v-spacer/>
      <v-icon class="mr-2" small>mdi-eye</v-icon>
      <span class="mr-6">{{$props.entry.viewNum}}</span>
      <v-icon class="mr-2" small>mdi-message-reply</v-icon>
      <span class="mr-6">{{$props.entry.replyNum}}</span>
      <v-icon class="mr-2" small>mdi-star</v-icon>
      <span class="mr-6">{{$props.entry.bookmarkNum}}</span>
      <v-icon class="mr-2" small>mdi-thumb-up</v-icon>
      <span>{{$props.entry.likeNum}}</span>
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
.cn-title {
  font-weight: bold;
}
.cn-date {
  font-size: 0.9rem;
  font-weight: bold;
}
.cn-time {
  font-weight: bold;
}
</style>
