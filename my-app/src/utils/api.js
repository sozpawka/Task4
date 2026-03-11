const API = 'http://lifestealer86.ru/api-shop'

export const loginRequest = (user) =>{
    return new Promise((resolve, reject) => {
        fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        .then(data=>{
			if(data.data){
				resolve(data.data.user_token)
			}else{
				reject(data.error)
			}
		})
        .catch((error) => {
            reject(error);
        });
    });
};
export const signupRequest = (user) =>{
	return new Promise((resolve,reject)=>{
		fetch(`${API}/signup`,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(async res=>{
			const data = await res.json()
			if(res.status === 201){
				resolve(data.data)
			}else{
				reject(data)
			}
		})
		.catch(error=>{
			reject(error)
		})

	})
};
export const getProducts=()=>{
	return new Promise((resolve,reject)=>{
		fetch(`${API}/products`)
		.then(res=>res.json())
		.then(data=>{
			resolve(data.data)
		})
		.catch(error=>{
			reject(error)
		})
	})
};
export const addToCartRequest=(product_id,token)=>{
	return fetch(`${API}/cart/${product_id}`,{
		method:'POST',
		headers:{
			'Authorization':'Bearer '+token,
			'Content-Type':'application/json'
		}
	})
	.then(res=>res.json())
};
export const getCartRequest = (token) => {
	return fetch(`${API}/cart`, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
	.then(res => res.json())
	.then(data => data.data)
};
export const removeFromCartRequest = (id, token) => {
	return fetch(`${API}/cart/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
	.then(res => res.json())
};
export const createOrderRequest = (token) => {
	return fetch(`${API}/order`, {
	method: 'POST',
	headers: {
	'Authorization': 'Bearer ' + token
	}
	})
	.then(res => res.json())
	.then(res=>res.data)
};
export const getOrdersRequest = (token) => {
	return fetch(`${API}/order`,{
		headers:{
			'Authorization':'Bearer '+token
		}
	})
	.then(res=>res.json())
	.then(res=>res.data)
};