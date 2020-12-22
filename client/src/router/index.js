import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';


import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
   beforeEnter(to, from, next){
    store
        .dispatch("auth/authenticate")
        .then(() => {
          next("/dashboard");
          console();
        })
        .catch(() => {
          next("/login");
        });
   }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dasshboard',
    component: Dashboard,
   
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
