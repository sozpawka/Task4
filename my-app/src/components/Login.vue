<template>
	<div class="login-style">
		<h1>Вход</h1>
		<div class="form">
			<label>Email</label>
			<input v-model="email" :class="{errorInput: errors.email}" placeholder="Email">
			<p v-if="errors.email" class="error">{{ errors.email }}</p>
			<label>Пароль</label>
			<input v-model="password" type="password" :class="{errorInput: errors.password}" placeholder="Пароль">
			<p v-if="errors.password" class="error">{{ errors.password }}</p>
			<button class="login-btn" @click="login">Войти</button>
			<button class="back-btn" @click="$router.push('/')">Назад</button>
		</div>
	</div>
</template>

<script>
import { loginRequest } from '../utils/api'
export default {
	data() {
		return {
			email: '',
			password: '',
			errors: {}
		}
	},
	methods: {
		validate() {
			this.errors = {}
			if (!this.email) this.errors.email = 'Введите email'
			if (!this.password) this.errors.password = 'Введите пароль'
			return Object.keys(this.errors).length === 0
		},
		login() {
			if (!this.validate()) return

			loginRequest({ email: this.email, password: this.password })
			.then(token => {
				localStorage.setItem('myAppToken', token)
				localStorage.setItem('username', this.email)
				this.$router.push('/')
			})
			.catch(() => {
				this.errors.email = 'Неправильный логин или пароль'
				this.errors.password = 'Неправильный логин или пароль'
			})
		}
	}
}
</script>
<style scoped>
.login-style{
	width:300px;
	margin:100px auto;
	text-align:center;
}
.form{
	display:flex;
	flex-direction:column;
	gap:10px;
}
.login-btn{
	background:#3498db;
	color:white;
}
input.errorInput{
	border:1px solid red;
}
</style>