const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function login(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/sign-in`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData),
            credentials:'include'
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function signUp(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {

        })
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function Logout() {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/logout`,{
            method:"POST",
            credentials:'include'
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
    }
}
export {login, signUp, Logout};