<template>
	<div class="home">
		<h1>Каталог товаров</h1>
		<div v-if="!isAuth" class="links">
			<router-link to="/login" class="login">Войти</router-link>
			<router-link to="/signup" class="signup">Регистрация</router-link>
		</div>
		<div v-else class="profile">
			<p>Профиль: {{username}}</p>
			<p>Корзина: {{cartCount}}</p>
			<button class="add" @click="$router.push('/cart')">
				Открыть корзину
			</button>
			<button class="login" @click="$router.push('/orders')">
				Мои заказы
			</button>
			<button class="delete" @click="logout">
				Выйти
			</button>
		</div>
		<div class="products">
			<div v-for="product in products" :key="product.id" class="card">
				<h3>{{product.name}}</h3>
				<p>{{product.description}}</p>
				<p class="price">{{product.price}} ₽</p>
				<button v-if="isAuth" class="add" @click="addToCart(product.id)">
					Добавить в корзину
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import { getProducts, addToCartRequest, getCartRequest } from '../utils/api'
export default {
	data(){
		return{
			products:[],
			cartCount:0
		}
	},
	computed:{
		isAuth(){
			return this.$store.getters.isAuthenticated
		},
		username(){
			return localStorage.getItem('username')
		},
		token(){
			return localStorage.getItem('myAppToken')
		}
	},
	mounted(){
		this.loadProducts()
		if(this.token){
			this.loadCart()
		}
	},
	methods:{
		loadProducts(){
			getProducts()
			.then(data=>{
				this.products=data.slice(0,9)
			})
		},
		loadCart(){
			getCartRequest(this.token)
			.then(data=>{
				this.cartCount=data.length
			})
		},
		addToCart(product_id){
			addToCartRequest(product_id,this.token)
			.then(()=>{
				alert('Товар добавлен в корзину')
				this.cartCount++
			})
			.catch(()=>{
				alert('Ошибка добавления')
			})
		},
		logout(){
			fetch('http://lifestealer86.ru/api-shop/logout',{
				method:'GET',
				headers:{
					'Authorization':'Bearer '+this.token
				}
			})
			.then(()=>{
				localStorage.removeItem('myAppToken')
				this.$router.push('/')
			})
		}
	}
}
</script>
<style scoped>
.home{
	text-align:center;
	padding:40px;
}
.products{
	margin-top:40px;
	display:grid;
	grid-template-columns:repeat(3,1fr);
	gap:20px;
}
.price{
	font-weight:bold;
	margin:10px 0;
}
.links a{
	padding:6px 12px;
	border-radius:5px;
	color:white;
	text-decoration:none;
}
</style>