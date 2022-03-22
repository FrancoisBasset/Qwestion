import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MyProfileView from '../views/MyProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: HomeView
    },
	{
		path: '/inscription',
		name: 'inscription',
		component: RegisterView
	},
	{
		path: '/connexion',
		name: 'connexion',
		component: LoginView
	},
	{
		path: '/monprofil',
		name: 'monprofil',
		component: MyProfileView
	}
  ]
})

export default router;