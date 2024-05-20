import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { handleLoginRedux } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const account = useSelector(state => state.user.dataRedux.account);

    const isAuthenticated = useSelector(state => state.user.dataRedux.isAuthenticated);

    const [isLoading, setIsLoading] = useState(false);
    const handleChangeLoading = () => {
        setIsLoading(!isLoading)
    }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            toast.error('Please enter your username and password.');
            return;
        }

        try {
            await dispatch(handleLoginRedux(username, password));
            window.location.reload();


        } catch (error) {
            toast.error('Invalid username or password.');
            setIsLoading(false)
        }
    };
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleChangeLoading();
            handleLogin();
        }
    }
    useEffect(() => {
        if (account && isAuthenticated) {
            navigate("/");
            toast.success('Login successful!');
        }
    }, [account])

    return (
        <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                           border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md 
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                           sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                           border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md 
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                           sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }
                                }
                                onKeyPress={(event) => {
                                    handlePressEnter(event)
                                }}

                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                                       text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {isLoading ? (
                                    <img className="h-5 w-5" src="/loading.png" alt="Loading..." />
                                ) : null}
                            </span>

                            {isLoading ? 'Logging in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            create a new account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
