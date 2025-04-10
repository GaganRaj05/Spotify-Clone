const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function checkAuth() {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/check-auth`,{
            method:"GET",
            credentials:'include'
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data.user;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
export default checkAuth;