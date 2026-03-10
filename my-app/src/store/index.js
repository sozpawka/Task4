import { createStore } from 'vuex'

export default createStore({
	state:{
		token:localStorage.getItem('myAppToken')||''
	},
	getters:{
		isAuthenticated:(state)=>!!state.token
	},
	mutations:{
		AUTH_SUCCESS:(state,token)=>{
			state.token=token
		},
		AUTH_ERROR:(state)=>{
			state.token=''
		}
	},
	actions:{
		AUTH_REQUEST:({commit},user)=>{
			return new Promise((resolve,reject)=>{
				fetch('http://localhost:3000/login',{
					method:'POST',
					headers:{'Content-Type':'application/json'},
					body:JSON.stringify(user)
				})
				.then(res=>res.json())
				.then(data=>{
					const token=data.data.user_token
					localStorage.setItem('myAppToken',token)
					commit('AUTH_SUCCESS',token)
					resolve()
				})
				.catch(()=>{
					commit('AUTH_ERROR')
					localStorage.removeItem('myAppToken')
					reject()
				})
			})
		}
	}
})