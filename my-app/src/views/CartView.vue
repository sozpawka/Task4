<template>
	<div class="cart">
		<h1>Моя корзина</h1>
        <button @click="$router.push('/')">
             На главную
        </button>
		<div v-if="cart.length === 0">
			Корзина пустая
		</div>
		<button v-if="selectedItems.length > 0" class="order-btn" @click="makeOrder">
			Оформить заказ
		</button>
		<div v-for="item in cart" :key="item.id" class="card">
			<h3>{{ item.name }}</h3>
			<p>{{ item.description }}</p>
			<p>{{ item.price }} ₽</p>
			<button @click="removeItem(item.id)">
				Удалить
			</button>
			<button @click="addToOrder(item.id)">
				Добавить к заказу
			</button>
			<input type="checkbox":value="item.id" v-model="selectedItems"/>
		</div>
	</div>
</template>
<script>
import { getCartRequest, removeFromCartRequest } from '../utils/api'
export default {
	data() {
		return {
			cart: [],
			selectedItems:[]
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
				this.selectedItems = this.selectedItems.filter(i => i !== id)
			})
		},
		addToOrder(id){
			if(!this.selectedItems.includes(id)){
				this.selectedItems.push(id)
			}
		},
		makeOrder(){
			if(this.selectedItems.length === 0){
				return
			}
			alert('Заказ успешно сформирован')
			const token = localStorage.getItem('myAppToken')
			this.selectedItems.forEach(id => {
				removeFromCartRequest(id,token)
			})
			this.cart = this.cart.filter(item => !this.selectedItems.includes(item.id))
			this.selectedItems = []
		},
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