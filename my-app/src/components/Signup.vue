<template>
	<div class="signup-style">
		<h1>Регистрация</h1>
		<div class="form">
			<label>ФИО</label>
			<input v-model="name" :class="{errorInput: errors.name}" placeholder="Имя">
			<p v-if="errors.name" class="error">{{ errors.name }}</p>

			<label>Email</label>
			<input v-model="email" :class="{errorInput: errors.email}" placeholder="Email">
			<p v-if="errors.email" class="error">{{ errors.email }}</p>

			<label>Пароль</label>
			<input v-model="password" type="password" :class="{errorInput: errors.password}" placeholder="Пароль">
			<p v-if="errors.password" class="error">{{ errors.password }}</p>

			<button class="signup-btn" @click="signup">Зарегистрироваться</button>
			<button class="back-btn" @click="$router.push('/')">Назад</button>
		</div>
	</div>
</template>

<script>
import { signupRequest } from '../utils/api'

export default {
	data() {
		return {
			name: '',
			email: '',
			password: '',
			errors: {}
		}
	},
	methods: {
		validate() {
			this.errors = {}
			if (!this.name) {
				this.errors.name = 'Введите ФИО'
			} else if (!/^[А-Яа-яA-Za-z\s]+$/.test(this.name)) {
				this.errors.name = 'ФИО должно содержать только буквы'
			}
			if (!this.email) {
				this.errors.email = 'Введите email'
			} else if (!/.+@.+\..+/.test(this.email)) {
				this.errors.email = 'Неверный формат email'
			}
			if (!this.password) {
				this.errors.password = 'Введите пароль'
			} else if (this.password.length < 4) {
				this.errors.password = 'Пароль минимум 4 символа'
			}
			return Object.keys(this.errors).length === 0
		},
		signup() {
			if (!this.validate()) return

			signupRequest({
				name: this.name,
				email: this.email,
				password: this.password
			})
			.then(() => {
				alert('Регистрация успешна')
				this.$router.push('/login')
			})
			.catch(() => {
				this.errors.email = 'Пользователь с таким email уже существует'
			})
		}
	}
}
</script>

<style scoped>
.signup-style{
	width:300px;
	margin:100px auto;
	text-align:center;
}
.form{
	display:flex;
	flex-direction:column;
	gap:10px;
}
.signup-btn{
	background:#f39c12;
	color:white;
}
.back-btn{
	background:#777;
	color:white;
}
input.errorInput{
	border:1px solid red;
}
</style>