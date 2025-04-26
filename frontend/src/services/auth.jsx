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
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData)
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

async function sendOtp(email) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/otp?email=${email}`,{
            method:"GET",
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

async function verifyOtp(email,otp) {
    try {
        const formData = {email, otp};

        const response = await fetch(`${BACKEND_URL}/auth/verify-email`,{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{"Content-type":"application/json"},
        })
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }   
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
export {login, signUp, Logout, sendOtp, verifyOtp};