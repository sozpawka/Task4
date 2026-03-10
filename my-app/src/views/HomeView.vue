<template>
	<div class="home">
		<h1>Каталог товаров</h1>
		<div v-if="!isAuth" class="links">
			<router-link to="/login">Войти</router-link>
			<router-link to="/signup">Регистрация</router-link>
		</div>
		<div v-if="isAuth" class="profile">
			<p>Профиль: {{username}}</p>
			<button @click="logout">Выйти</button>
		</div>

		<div class="products">
			<div v-for="product in products" :key="product.id" class="card">
				<h3>{{product.name}}</h3>
				<p>{{product.description}}</p>
				<p class="price">{{product.price}} ₽</p>
				<button @click="addToCart(product)">
					Добавить в корзину
				</button>
			</div>
		</div>

	</div>
</template>

<script>
import { getProducts } from '../utils/api'
export default {
	data(){
		return{
			products:[]
		}
	},
	computed:{
		isAuth(){
			return this.$store.getters.isAuthenticated
		},
		username(){
			return localStorage.getItem('username')
		}
	},
	methods:{
		logout(){
			this.$store.dispatch('LOGOUT')
			this.$router.push('/')
		},
		addToCart(product){
			console.log('Добавлено в корзину',product)
		}
	},
	mounted(){
		getProducts()
		.then(data=>{
			this.products = data.slice(0,9)
		})
	}
}
</script>

<style scoped>
.home{
	text-align:center;
	padding:40px;
}
.links a{
	margin:10px;
	padding:10px 20px;
	border:1px solid black;
	text-decoration:none;
	border-radius:5px;
}
.profile{
	width:200px;
	margin:30px auto;
	padding:15px;
	border:1px solid black;
	border-radius:5px;
}
.profile button{
	margin-top:10px;
	padding:5px 10px;
	border:1px solid black;
	border-radius:5px;
}
.products{
	margin-top:40px;
	display:grid;
	grid-template-columns:repeat(3,1fr);
	gap:20px;
}
.card{
	border:1px solid black;
	padding:15px;
	border-radius:5px;
}
.price{
	font-weight:bold;
	margin:10px 0;
}
.card button{
	padding:5px 10px;
	border:1px solid black;
	border-radius:5px;
}
</style>