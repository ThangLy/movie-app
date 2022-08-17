import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        const from = location.state?.from?.pathname || '/';

        e.preventDefault();
        // set configurations
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/api/auth/register',
                data: {
                    username,
                    email,
                    password
                },
            });
            if (response.data.code === 500) {
                setRegister(false);
            } else {
                setRegister(true);
                auth.login({ $or: [{ email: response.data.email }, { username: response.data.username }] }, () => {
                    navigate(from, { replace: true });
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (auth.isLogIn) {
        return <Navigate to="/" />;
    } else
        return (
            <div className="login">
                <div className="container">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h1>Register</h1>
                        <input type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="loginButton"
                            onClick={(e) => handleSubmit(e)}>
                            Submit
                        </button>

                        <a href="login">(Or Sign In if you already have an account)</a>
                    </form>
                </div>
            </div>
        );
};

export default Register;