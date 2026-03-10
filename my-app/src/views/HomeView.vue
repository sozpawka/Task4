<template>
	<div class="home">
		<h1>Каталог товаров</h1>
		<div v-if="!isAuth" class="links">
			<router-link to="/login">Войти</router-link>
			<router-link to="/signup">Регистрация</router-link>
		</div>
		<div v-if="isAuth" class="profile">
			<p>Профиль: {{username}}</p>
			<button @click="logout">Выйти</button>
		</div>

	</div>
</template>

<script>
export default{
	computed:{
    isAuth(){
      return this.$store.getters.isAuthenticated
    },
    username(){
      return localStorage.getItem('username')
    }
  },
	methods:{
		logout(){
			this.$store.dispatch('LOGOUT')
			this.$router.push('/')
		}
	}
}
</script>

<style scoped>
.home{
	text-align:center;
	padding:40px;
}
.links a{
	margin:10px;
	padding:10px 20px;
	border:1px solid black;
	text-decoration:none;
	border-radius:5px;
}
.profile{
	width:200px;
	margin:30px auto;
	padding:15px;
	border:1px solid black;
	border-radius:5px;
}
.profile button{
	margin-top:10px;
	padding:5px 10px;
	border:1px solid black;
	border-radius:5px;
}
</style>