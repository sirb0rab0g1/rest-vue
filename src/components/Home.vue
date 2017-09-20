<template lang="html">
  <div class="home">
    <div class="container-fluid">
      <div class="row">
      <md-progress md-indeterminate v-if="status"></md-progress>
      <div class="col-lg-12 col-md-6 col-xs-12 text-center">
        <div class="row">

          <div class="col-lg-12" style="margin-top:20px;">
            <croppa 
              v-model="myCroppa"
              :input-accept="'image/*'"
            ></croppa>
          </div>

          <div class="col-lg-2 col-md-6 col-xs-12">
            <md-input-container>
              <label>First Name</label>
              <md-input maxlength="30" v-model="first_name" ></md-input>
            </md-input-container>
          </div>
          
          <div class="col-lg-2 col-md-6 col-xs-12">
            <md-input-container>
              <label>Middle Name</label>
              <md-input maxlength="30" v-model="middle_name" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2 col-md-6 col-xs-12">
            <md-input-container>
              <label>Last Name</label>
              <md-input maxlength="30" v-model="last_name" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2 col-md-6 col-xs-12">
            <md-input-container>
              <label>Location</label>
              <md-input maxlength="140" v-model="location" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2 col-md-6 col-xs-12">
            <md-input-container>
              <label>Email</label>
              <md-input maxlength="100" v-model="email" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2 col-md-6 col-xs-12">
            <md-input-container>
              <label>Age</label>
              <md-input maxlength="3" type="number" v-model="age" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2 col-md-6 col-xs-12" style="margin-top:20px;">
            <md-button class="md-raised" @click="postData(first_name, middle_name, last_name, location, email, age)">Register Data</md-button>
          </div>
        </div>


      </div>
    </div>
  </div>

  <md-snackbar :md-position="'top' + ' ' + 'center'" ref="snackbar" :md-duration="4000">
    <span>{{ msg }}</span>
    <md-button class="md-accent" @click="$refs.snackbar.close()">Retry</md-button>
  </md-snackbar>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import url from '../http/index'
  import Croppa from 'vue-croppa'

  Vue.use(Croppa)

  export default {
    name: 'home',
    props: [],
    mounted () {

    },
    data () {
      return {
        msg: '',
        status: false,
        baseUrl: url[0],
        first_name: '',
        middle_name: '',
        last_name: '',
        location: '',
        email: '',
        age: '',
        creation_date: '',
        initialValue: '',
        sample: '',
        profile_image: null,
        img: null,
        myCroppa: {}
      }
    },
    methods: {
      postData (firstName, middleName, lastName, location, email, age) {
        this.status = true
        var body = {first_name: firstName, middle_name: middleName, last_name: lastName, location: location, email: email, age: age}
        axios.post(this.baseUrl.url + '/info/personal/', body, {headers: { 'Content-Type': 'application/json' }})
        .then(response => {
          let imageData = this.myCroppa.generateDataUrl()
          axios.post(this.baseUrl.url + '/info/upload-profile-image/', {id: response.data.id, image: this.myCroppa.getChosenFile().name, img_uri: imageData}, {headers: { 'Content-Type': 'application/json' }}).then(response => {
            this.status = false
            this.msg = 'Successfully inserted data'
            this.$refs.snackbar.open()
          })
        })
        .catch(error => {
          if (error.response.data.email[0] === 'True') {
            this.msg = 'Email is already in used'
            this.status = false
            this.$refs.snackbar.open()
          }
        })
      }
    },
    computed: {

    },
    components: {
    }
}
</script>

<style scoped>
  /*@import 'vue-croppa/dist/vue-croppa.css'*/
</style>
