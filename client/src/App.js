import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider, RequireAuth } from './context/auth';

const App = () => {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Layout />
                            </RequireAuth>
                        }
                    >
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;