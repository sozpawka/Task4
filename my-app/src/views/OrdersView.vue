<template>
<div class="orders">
	<h1>Мои заказы</h1>
	<button class="back" @click="$router.push('/')">
		Назад
	</button>
	<div v-if="orders.length === 0">
		У вас пока нет заказов
	</div>
	<div v-for="order in orders" :key="order.id" class="order-card">
		<h3>Заказ № {{ order.id }}</h3>
		<p> Товары: {{ formatProducts(order.products) }}</p>
		<p>	Сумма заказа: {{ order.order_price }} ₽	</p>
	</div>
</div>
</template>

<script>
import { getOrdersRequest } from '../utils/api'
export default {
	data(){
		return{
			orders:[]
		}
	},
	mounted(){
			const token = localStorage.getItem('myAppToken')
			getOrdersRequest(token)
			.then(data=>{
			this.orders = data
		})
	},
	methods:{
		formatProducts(products){
			const map = {}

			products.forEach(id=>{
				if(!map[id]){
					map[id] = 1
				}else{
					map[id]++
				}
			})

			return Object.entries(map)
				.map(([id,count]) => `${id} (${count})`)
				.join(', ')
		}
	},
}
</script>
<style scoped>
.orders{
	width:600px;
	margin:auto;
}
.order-card{
	border:1px solid black;
	padding:15px;
	margin:15px 0;
	border-radius:5px;
}
button{
	padding:6px 12px;
	border:1px solid black;
	border-radius:5px;
	margin-bottom:20px;
}
</style>