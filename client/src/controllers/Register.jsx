import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    async function verifyRegistration() {
        try {
            const response = await axios.post("http://localhost:3000/register", formData);
            console.log("RESPONSE DATA SUCCESS => ", response.data);
            return response.data;
        } catch (err) {
            console.log(err.message);
            setError("Registeration failed. Please enter another username or try to log in.");
            return false;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(""); // Reset error message
        if (!formData.username || !formData.password) {
            setError("Please fill in both fields.");
            return;
        }
        console.log("LOGIN FORM DATA => ", formData);
        const isLoggedIn = await verifyRegistration();
        console.log("IS LOGGED IN => ", isLoggedIn)
        if (isLoggedIn) {
            navigate("/tasks/all", {state: {username: false}});
        } else {
            navigate("/register");
        }
    }

    return (
        <>
            <div className="loginContainer">
                <h2>Register</h2>
                {error && <p className="error-message">{error}</p>}
                <form action="#" method='POST' onSubmit={handleSubmit}>
                    <div className='formContainer'>
                        <div>
                            <label className="form-label">Enter your username </label>
                            <input className="form-control" type="text" name="username" value={formData.username} onChange={handleChange} />
                        </div>

                        <div>
                            <label className="form-label">Enter your password </label>
                            <input className="form-control" type="text" name="password" value={formData.password} onChange={handleChange} />
                        </div>

                        <input className="btn btn-primary login-submit-btn" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </>
    );
}