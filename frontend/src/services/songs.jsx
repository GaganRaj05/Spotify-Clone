const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function getTopSongs() {
    try {
        const response = await fetch(`${BACKEND_URL}/songs/top-50-songs`,{
            method:"GET",
            credentials:"include",
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

async function getAllSongs() {
    try {
        const response = await fetch(`${BACKEND_URL}/songs/songs`,{
            credentials:'include',
            method:"GET"
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

export  {getTopSongs, getAllSongs};