<template>
	<form class="signup" @submit.prevent="signup" novalidate>
		<h1>Регистрация</h1>
		<label>ФИО</label>
		<input type="text" v-model="fio" :class="{errorInput: errors.fio}">
		<p v-if="errors.fio" class="error">{{errors.fio}}</p>
		<label>Email</label>
		<input type="email" v-model="email" :class="{errorInput: errors.email}">
		<p v-if="errors.email" class="error">{{errors.email}}</p>
		<label>Password</label>
		<input type="password" v-model="password" :class="{errorInput: errors.password}">
		<p v-if="errors.password" class="error">{{errors.password}}</p>
		<hr>
		<button type="submit">Зарегистрироваться</button>
		<router-link to="/" class="back">Назад</router-link>
	</form>
</template>

<script>
import { signupRequest } from '../utils/api'

export default{
	data(){
		return{
			fio:'',
			email:'',
			password:'',
			errors:{}
		}
	},
	methods:{
		validate(){
			this.errors={}
			if(!this.fio){
				this.errors.fio='Введите ФИО'
			}else if(!/^[А-Яа-яA-Za-z\s]+$/.test(this.fio)){
				this.errors.fio='ФИО должно содержать только буквы'
			}
			if(!this.email){
				this.errors.email='Введите email'
			}else if(!/.+@.+\..+/.test(this.email)){
				this.errors.email='Неверный формат email'
			}
			if(!this.password){
				this.errors.password='Введите пароль'
			}else if(this.password.length<4){
				this.errors.password='Пароль минимум 4 символа'
			}
			return Object.keys(this.errors).length===0
		},
        signup(){
			if(!this.validate()){
				return
			}
            const user={
                fio:this.fio,
                email:this.email,
                password:this.password
            }
            signupRequest(user)
            .then(()=>{
                alert('Регистрация успешна')
                this.$router.push('/login')
            })
            .catch(()=>{
				this.errors.email='Пользователь с таким email уже существует'
			})
        }
	}
}
</script>

<style scoped>
.signup{
	display:flex;
	flex-direction:column;
	width:300px;
	margin:0 auto;
	padding:20px;
}
.signup input,button{
	border:1px solid black;
	border-radius:5px;
	padding:5px;
	margin-bottom:10px;
}
.error{
	color:red;
	margin-top:5px;
	font-size:12px;
}
.signup input.errorInput{
	border:1px solid red;
}
</style>