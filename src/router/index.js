import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    }
  ]
});
