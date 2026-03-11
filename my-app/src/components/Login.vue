<template>
	<form class="login" @submit.prevent="login" novalidate>
		<h1>Sign in</h1>
		<label>Username</label>
		<input type="text" v-model="username" :class="{errorInput: errors.username}"/>
		<p v-if="errors.username" class="error">{{errors.username}}</p>
		<label>Password</label>
		<input type="password" v-model="password" :class="{errorInput: errors.password}"/>
		<p v-if="errors.password" class="error">{{errors.password}}</p>
		<hr/>
		<button type="submit">Login</button>
		<router-link to="/" class="back">Назад</router-link>
	</form>
</template>

<script>
export default{
	data(){
		return{
			username:'',
			password:'',
			errors:{}
		}
	},
	methods:{
	validate(){
		this.errors={}
		if(!this.username){
			this.errors.username='Введите email'
		}
		if(!this.password){
			this.errors.password='Введите пароль'
		}
		return Object.keys(this.errors).length===0
	},
		login(){
			if(!this.validate()){
				return
			}
			const userData={
				email:this.username,
				password:this.password
			}
			localStorage.setItem('username',this.username)
			this.$store
				.dispatch('AUTH_REQUEST',userData)
				.then(()=>this.$router.push('/'))
				.catch((err)=>{
					this.errors.username = 'Неправильный логин или пароль';
					this.errors.password = 'Неправильный логин или пароль';
				})
		}
	}
}
</script>

<style scoped>
.login{
	display:flex;
	flex-direction:column;
	width:300px;
	padding:10px;
	margin:0 auto;
}
.login input,button{
	border:1px solid black;
	border-radius:5px;
}
hr{
	margin:10px 0;
}
.error{
	color:red;
	margin-top:5px;
	font-size:12px;
}
.login input.errorInput{
	border:1px solid red;
}
</style>