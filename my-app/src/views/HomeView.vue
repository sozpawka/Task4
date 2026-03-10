<template>
	<div class="home">

		<h1>Каталог товаров</h1>

		<div class="links">
			<router-link to="/login">Войти</router-link>
		</div>

	</div>
</template>

<script>
export default {
	name: 'HomeView'
}
</script>

<style scoped>
.home{
	text-align:center;
	padding:40px;
}

.links{
	margin-top:20px;
}

.links a{
	padding:10px 20px;
	border:1px solid black;
	text-decoration:none;
	border-radius:5px;
}
</style>