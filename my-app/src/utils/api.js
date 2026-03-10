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
export const signupRequest = (user)=>{
	return new Promise((resolve,reject)=>{
		fetch(`${API}/signup`,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(res=>res.json())
		.then(data=>{
			if(data.data){
				resolve(data.data.user_token)
			}else{
				reject(data.error)
			}
		})
		.catch(error=>{
			reject(error)
		});
	});
};