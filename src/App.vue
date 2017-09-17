<template>
  <div id="app">

    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title"> 
      <a v-bind:href="link"> {{title}}</a>
      </h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
        <md-toolbar class="md-large">
          <div class="md-toolbar-container">
            <md-avatar class="md-large" style="margin-top:20px;">
              <img src="https://scontent.fmnl4-6.fna.fbcdn.net/v/t1.0-9/19961222_1740052446022448_1520076539138365916_n.jpg?oh=fe0330757247bd319055a6b90a4d1c56&oe=5A4289B0" alt="Dogo" draggable="false">
            </md-avatar>

          </div>
          <div class="text-center" style="width:100%">
            <span  class="md-title" >
              Vue + Rest
            </span>
          </div>
        </md-toolbar>

        <div style="width:100%">
          <md-button class="md-raised" style="width:95%;height:50px;">Edit Data</md-button>
          <md-button class="md-raised" style="width:95%;height:50px;">Register Data</md-button>
        </div>
    </md-sidenav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'VueMaterial'
    }
  },
  methods: {
    hello () {
      return this.title
    },
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (event) {

    },
    close (event) {

    }
  }
}
</script>

<style src="vue-material/dist/vue-material.css"></style>
<style src="bootstrap/dist/css/bootstrap.min.css"></style>
