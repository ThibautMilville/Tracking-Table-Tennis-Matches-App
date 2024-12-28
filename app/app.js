import Vue from 'nativescript-vue'
import Home from './Home'

new Vue({
    render: (h) => h('frame', [h(Home)]),
}).$start()