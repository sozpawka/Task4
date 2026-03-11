<template>
	<div class="cart">
		<h1>Моя корзина</h1>
        <button @click="$router.push('/')">
             На главную
        </button>
		<div v-if="cart.length === 0">
			Корзина пустая
		</div>
		<div v-for="item in cart" :key="item.id" class="card">
			<h3>{{ item.name }}</h3>
			<p>{{ item.description }}</p>
			<p>{{ item.price }} ₽</p>
			<button @click="removeItem(item.id)">
				Удалить
			</button>
		</div>
	</div>
</template>
<script>
import { getCartRequest, removeFromCartRequest } from '../utils/api'
export default {
	data() {
		return {
			cart: []
		}
	},
	mounted() {
		const token = localStorage.getItem('myAppToken')
		getCartRequest(token)
			.then(data => {
				this.cart = data
			})
	},
	methods:{
		removeItem(id){
			const token = localStorage.getItem('myAppToken')
			removeFromCartRequest(id,token)
			.then(()=>{
				this.cart = this.cart.filter(item => item.id !== id)

			})
		}
	},
}
</script>
<style scoped>
.cart {
	width: 600px;
	margin: auto;
}
.card {
	border: 1px solid black;
	padding: 15px;
	margin: 10px 0;
	border-radius: 5px;
}
button{
	padding:6px 12px;
	border:1px solid black;
	border-radius:5px;
	margin-bottom:20px;
}
</style>