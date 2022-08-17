import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';


const Login = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkInformation(validate);
    }, [validate]);

    const handleSubmit = async (e) => {
        const from = location.state?.from?.pathname || '/';
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/api/auth/login',
                data: {
                    username,
                    email,
                    password
                },
            });
            if (response.data.code === 400) {
                setValidate(false);
            } else {
                setValidate(true);
                //auth.login({ $or: [{ email: response.data.email }, { username: response.data.username }] }, () => {
                auth.login({ username: response.data.username }, () => {

                    navigate(from, { replace: true });
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    function checkInformation(validate) {
        return (
            !validate && (
                <div className="alert alert-danger my-2" role="alert">
                    Wrong password or username!
                </div>
            )
        );
    }

    if (auth.isLogIn) {
        return <Navigate to="/" />;
    } else
        return (
            <div className="login">
                <div className="container">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h1>Sign In</h1>
                        <input type="text"
                            placeholder="Email or Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="loginButton"
                            onClick={(e) => handleSubmit(e)}>
                            Sign In
                        </button>
                        {checkInformation(validate)}
                        <a href="register"
                            style={{ paddingBottom: 20 }}>
                            Click here to register an account
                        </a>
                        <a href="forgot-password"
                        >
                            forgot password
                        </a>
                    </form>
                </div>
            </div>
        );
}

export default Login;