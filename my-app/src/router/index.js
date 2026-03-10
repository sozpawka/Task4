import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const ifAuthenticated = (to, from, next)=>{
	if(store.getters.isAuthenticated){
		next()
		return
	}
	next('/login')
}

const ifNotAuthenticated = (to, from, next)=>{
	if(!store.getters.isAuthenticated){
		next()
		return
	}
	next('/')
}

const routes=[
	{
		path:'/',
		name:'home',
		component:HomeView
	},
	{
		path:'/login',
		name:'login',
		component:LoginView,
		beforeEnter:ifNotAuthenticated
	},
	{
		path:'/signup',
		name:'signup',
		component:()=>import('../views/SignupView.vue'),
		beforeEnter:ifNotAuthenticated
	}
]

const router=createRouter({
	history:createWebHistory(),
	routes
})

export default router