
export const getToken = ()=>{
    const auth= JSON.parse(localStorage.getItem('auth'));
    const token = auth?auth.token:null;
    return token;
}

export const saveToken = (token) =>{
    localStorage.setItem(
        'auth',
        JSON.stringify({
            token: token
        })
    );
}

export const removeToken = () => {
    localStorage.clear();
}