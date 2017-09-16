import Vue from 'vue'

export const loadData = ({commit}) => {
  Vue.http.get('/info/personal/')
    .then(data => {
      console.log(data)
    })
}
