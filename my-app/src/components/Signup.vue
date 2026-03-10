<template>
	<form class="signup" @submit.prevent="signup">
		<h1>Регистрация</h1>
		<label>ФИО</label>
		<input type="text" v-model="fio" required>
		<label>Email</label>
		<input type="email" v-model="email" required>
		<label>Password</label>
		<input type="password" v-model="password" required>
		<hr>
		<button type="submit">Зарегистрироваться</button>
		<p v-if="error" class="error">{{error}}</p>
		<router-link to="/">Назад</router-link>
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
			error:''
		}
	},
	methods:{
        signup(){
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
            .catch((err)=>{
				if(err && err.errors){
					this.error=Object.values(err.errors[0]).join(', ')
				}else{
					this.error='Ошибка регистрации'
				}
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
	margin-top:10px;
}
</style>