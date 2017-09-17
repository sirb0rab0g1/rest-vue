<template>
  <div class="hello">
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
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>
  </md-sidenav>
  
  <md-button class="md-raised md-primary" @click="getData()">Load Data Here</md-button>

  <div class="container-fluid">
      <div class="row">
      <md-progress md-indeterminate v-if="status"></md-progress>
      <div class="col-lg-12 col-md-6 col-xs-12 text-center">
        <div class="row" v-for="item in items">
        <input type="" name="" v-if="false" v-model="item.id">

          <div class="col-lg-1">
            <md-input-container>
              <label>First Name</label>
              <md-input maxlength="30" v-model="item.first_name" ></md-input>
            </md-input-container>
          </div>
          
          <div class="col-lg-1">
            <md-input-container>
              <label>Middle Name</label>
              <md-input maxlength="30" v-model="item.middle_name" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-1">
            <md-input-container>
              <label>Last Name</label>
              <md-input maxlength="30" v-model="item.last_name" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2">
            <md-input-container>
              <label>Location</label>
              <md-input maxlength="140" v-model="item.location" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2">
            <md-input-container>
              <label>Email</label>
              <md-input maxlength="100" v-model="item.email" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-1">
            <md-input-container>
              <label>Age</label>
              <md-input maxlength="3" type="number" v-model="item.age" ></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2">
            <md-input-container>
              <label>Creation Date</label>
              <md-input maxlength="3" v-model="item.creation_date" disabled></md-input>
            </md-input-container>
          </div>

          <div class="col-lg-2" style="margin-top:20px;">
            <md-button class="md-raised" @click="removeData(item.id)">Delete</md-button>

            <md-button class="md-raised" @click="putData(item.id, item.first_name, item.middle_name, item.last_name, item.location, item.email, item.age)">Update</md-button>
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
import axios from 'axios'
import url from '../http/index'

export default {
  name: 'hello',
  items: [],
  data () {
    return {
      title: 'VueMaterial',
      link: 'http://vuematerial.io/#/',
      items: this.items,
      status: false,
      msg: '',
      baseUrl: url[0]
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

    },
    getData () {
      this.status = true
      axios.get(this.baseUrl.url + '/info/personal/').then((response) => {
        this.items = response.data.results
        console.log(response.data.results)
        this.status = false
        this.msg = 'Successfully fetched data'
        this.$refs.snackbar.open()
      })
    },
    putData (id, firstName, middleName, lastName, location, email, age) {
      this.status = true
      var pk = id
      var body = {first_name: firstName, middle_name: middleName, last_name: lastName, location: location, email: email, age: age}
      axios.put(this.baseUrl.url + '/info/personal/' + pk + '/', body, {headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        this.status = false
        this.msg = 'Successfully update data'
        this.$refs.snackbar.open()
      })
      .catch(error => {
        console.log(error)
      })
    },
    removeData (id) {
      var pk = id
      axios.delete(this.baseUrl.url + '/info/personal/' + pk + '/', {headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        this.status = false
        this.msg = 'Successfully delete data'
        this.$refs.snackbar.open()
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    postData (firstName, middleName, lastName, location, email, age) {
      this.status = true
      var body = {first_name: 'firstName', middle_name: 'middleName', last_name: 'lastName', location: 'location', email: 'email@pota.com', age: '90'}
      axios.post(this.baseUrl.url + '/info/personal/', body, {headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        this.status = false
        this.msg = 'Data saved'
        this.$refs.snackbar.open()
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
