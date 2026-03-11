<template>
	<div class="cart">
		<h1>Моя корзина</h1>
        <button @click="$router.push('/')">
             Назад
        </button>
		<div v-if="cart.length === 0">
			Корзина пустая
		</div>
		<button v-if="selectedItems.length > 0" class="order-btn" @click="makeOrder">
			Оформить заказ
		</button>
		<button v-if="cart.length > 0" @click="$router.push('/orders')">
			Мои заказы
		</button>
		<div v-for="item in groupedCart" :key="item.product_id" class="card">
			<h3>{{ item.name }}</h3>
			<p>{{ item.description }}</p>
			<p>{{ item.price }} ₽</p>
			<button @click="removeAll(item)">
				Удалить
			</button>
			<button @click="addToOrder(item)">
				Добавить к заказу
			</button>
			<input type="checkbox" :value="item.ids[0]" v-model="selectedItems" :disabled="!allowedItems.includes(item.ids[0])"/>
			<p>Количество: {{ item.count }}</p>
			<button @click="increase(item.product_id)">
				+
			</button>
			<button @click="decrease(item)">
				-
			</button>
		</div>
	</div>
</template>
<script>
import { getCartRequest, removeFromCartRequest, addToCartRequest } from '../utils/api'
export default {
	data() {
		return {
			cart: [],
			selectedItems:[],
			allowedItems: [],
		}
	},
	mounted() {
		const token = localStorage.getItem('myAppToken')
		getCartRequest(token)
			.then(data => {
				this.cart = data
			})
	},
	computed:{
		groupedCart(){
			const map = {}
			this.cart.forEach(item => {
				if(!map[item.product_id]){
					map[item.product_id] = {
						product_id: item.product_id,
						name: item.name,
						description: item.description,
						price: item.price,
						count: 1,
						ids: [item.id]
					}
				}else{
					map[item.product_id].count++
					map[item.product_id].ids.push(item.id)
				}
			})
			return Object.values(map)
		}
	},
	methods:{
		removeItem(id){
			const token = localStorage.getItem('myAppToken')
			removeFromCartRequest(id,token)
			.then(()=>{
				this.cart = this.cart.filter(item => item.id !== id)
				this.selectedItems = this.selectedItems.filter(i => i !== id)
			})
		},
		addToOrder(item){
			item.ids.forEach(id=>{
				if(!this.selectedItems.includes(id)){
					this.selectedItems.push(id)
				}
			})
		},
		makeOrder(){
			if(this.selectedItems.length === 0){
				return
			}
			const productsMap = {}
			this.cart
			.filter(item => this.selectedItems.includes(item.id))
			.forEach(item => {
				if(!productsMap[item.name]){
					productsMap[item.name] = 1
				}else{
					productsMap[item.name]++
				}

			})
			const order = {
				id: Date.now(),
				products: productsMap,
				order_price: this.cart
					.filter(item => this.selectedItems.includes(item.id))
					.reduce((sum,item)=>sum+item.price,0)
			}
			let orders = JSON.parse(localStorage.getItem('orders') || '[]')
			orders.push(order)
			localStorage.setItem('orders', JSON.stringify(orders))
			alert('Заказ успешно сформирован')
			const token = localStorage.getItem('myAppToken')
			this.selectedItems.forEach(id => {
				removeFromCartRequest(id, token)
			})
			this.cart = this.cart.filter(item => !this.selectedItems.includes(item.id))
			this.selectedItems = []
			this.$router.push('/orders')

		},
		increase(product_id){
			const token = localStorage.getItem('myAppToken')
			addToCartRequest(product_id, token)
			.then(()=>{
				getCartRequest(token)
				.then(data=>{
					this.cart = data
				})
			})
		},
		decrease(item){
			const token = localStorage.getItem('myAppToken')
			const cartId = item.ids[item.ids.length - 1]
			removeFromCartRequest(cartId, token)
			.then(()=>{
				getCartRequest(token)
				.then(data=>{
					this.cart = data
				})
			})
		},
		removeAll(item){
			const token = localStorage.getItem('myAppToken')
			item.ids.forEach(id=>{
				removeFromCartRequest(id, token)
			})
			getCartRequest(token)
			.then(data=>{
				this.cart = data
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
.top-buttons{
	display:flex;
	justify-content:space-between;
	margin-bottom:20px;
}
.top-buttons{
	display:flex;
	justify-content:space-between;
	margin-bottom:20px;
}
</style>