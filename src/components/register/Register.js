import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerNewUser } from '../../services/userService';
import { useSelector } from 'react-redux';

const Register = (props) => {

    const navigate = useNavigate();

    const account = useSelector(state => state.user.dataRedux.account);

    const isAuthenticated = useSelector(state => state.user.dataRedux.isAuthenticated);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        if (!email) {
            toast.error("Email is required!");
            setIsLoading(false)
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email!");
            setIsLoading(false)
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!username) {
            toast.error("Username is required!")
            return false;
        }
        if (!password) {
            toast.error("Password is required!")
            setIsLoading(false)
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password is not the same!")
            setIsLoading(false)
            return false;
        }

        return true;
    }
    useEffect(() => {
        if (account && isAuthenticated) {
            navigate("/");
        }
    }, [])
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleChangeLoading();
            handleRegister();
        }
    }
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeLoading = () => {
        setIsLoading(!isLoading)
    }

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            let response = await registerNewUser(username, email, password);

            let serverData = response;
            if (+serverData.ec === 0) {
                toast.success(serverData.em);
                navigate("/login");
            } else {
                toast.error(serverData.em);
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign up</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                           border-gray-300 placeholder-gray-500 text-gray-900 
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                           sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                           border-gray-300 placeholder-gray-500 text-gray-900 
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                           sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                           border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md 
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                           sm:text-sm"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                onKeyPress={(event) => {
                                    handlePressEnter(event)
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleRegister}
                            type="button"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                                       text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {isLoading ? (
                                    <img className="h-5 w-5" src="/loading.png" alt="Loading..." />
                                ) : null}
                            </span>

                            {isLoading ? 'Signing up...' : 'Sign up'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                    <div className="mt-3 return">
                        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                            <i className="fa fa-arrow-circle-left"></i>
                            <span title="Return to HomePage" className="ml-2">Return to HomePage</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;