<template>
	<div class="cart">
		<h1>Моя корзина</h1>
        <button @click="$router.push('/')">
             На главную
        </button>
		<div
			v-for="item in cart"
			:key="item.id"
			class="card"
		>
			<h3>{{ item.name }}</h3>
			<p>{{ item.description }}</p>
			<p>{{ item.price }} ₽</p>
		</div>
	</div>
</template>
<script>
import { getCartRequest } from '../utils/api'
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
	}
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