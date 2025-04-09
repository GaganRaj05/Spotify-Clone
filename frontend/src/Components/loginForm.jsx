import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../assets/styles/loginForm.css";
import Logo from "../assets/image.png"
const LoginForm = ()=> {
    const [formData, setFormData] = useState({email:"",password:""});
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const handleChange = (e)=> {
        setError("")
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e) => {
        navigate("/");
    }
    return (
        <div className="login-form-container">
            {error && <p className="form-error">{error}</p>}
            <img className="logo" src={Logo} alt="" />
            <h1>Log in to Spotify</h1>
            <br />
            <form method="POST" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required  />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required/>
                <button type="submit">Submit</button>
                <p className="signup-redirect">Don't have an account? <a href="">Sign up for Spotify</a></p>
            </form>
        </div>
    )
}
export default LoginForm;