import { iconClose, iconMenu } from "../svgs/icons";
import { removeOverflow } from "../utils/overflowbody";
import "../App.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from "react";
import { handleLogoutRedux } from "../components/redux/actions/userAction";
import { logoutUser } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";


const NavBar = ({ isOpen, setIsOpen }) => {
  removeOverflow(isOpen);

  const account = useSelector(state => state.user.dataRedux.account);
  const isAuthenticated = useSelector(state => state.user.dataRedux.isAuthenticated);



  const [isOpenLog, setIsOpenLog] = useState(false);
  const handleToggle = () => {
    setIsOpenLog(!isOpenLog);
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let data = await logoutUser();
    localStorage.removeItem('removie');
    await dispatch(handleLogoutRedux());

    if (data && +data.ec === 0) {
      toast.success('Logout success')
      // window.location.reload();

      navigate('/login')
    } else {
      toast.error(data.em)
    }
  }
  return (
    <>
      <header className="relative">
        <div
          className={
            isOpen
              ? " md:hidden xl:hidden 2xl:hidden fixed z-20  right-[0px] font-epilogue flex  animate-openmenu w-56  flex-col bg-sky-950/90     h-screen"
              : " md:hidden xl:hidden 2xl:hidden fixed z-20 animate-closemenu right-[-224px] flex w-56  flex-col   h-screen bg-sky-950/90   "
          }
        >
          <div className="flex flex-col items-end m-2 ">
            <span
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className=" block xl:hidden md:hidden"
            >
              {iconClose}
            </span>
          </div>
          <div className="h-full m-5 flex flex-col text-white items-end  text-2xl font-bold">
            <Link to={"/"}>
              <p className="mt-2 hover:scale-125 duration-300">Movies</p>
            </Link>
            <p className="mt-2 hover:scale-125 duration-300">TV Show</p>

            <Link to={"/favorites"}>
              <p className="mt-2 hover:scale-125 duration-300">WatchList</p>

            </Link>
            {
              account && isAuthenticated &&
              <>
                <Link to={"/wishlist"}>
                  <p className="hover:scale-125 duration-300">Wish List</p>
                </Link>
              </>
            }


            <div>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="hover:scale-125 duration-300"
                    onClick={handleToggle}
                  >
                    More
                  </button>
                </div>
                {isOpenLog && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {
                        account && !isAuthenticated ?
                          <>
                            <Link to="/login"
                              className="hover:scale-125 duration-300 block text-right"
                              onClick={handleToggle}
                            >
                              <p>Login</p>
                            </Link>
                            <Link to="/register"
                              className="hover:scale-125 duration-300 block text-right"
                              onClick={handleToggle}
                            >
                              <p>Register</p>
                            </Link>
                          </>
                          :
                          <p
                            className="hover:scale-125 duration-300 cursor-pointer block text-right"
                            onClick={handleLogout}
                          >
                            Logout
                          </p>
                      }

                    </div>
                  </div>

                )}
              </div>
            </div>
          </div>
        </div>
        <nav className="fixed    z-10 w-full p-2  md:p-4 xl:p-6 bg-sky-950 flex flex-row  justify-between md:justify-between items-center ">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <Link to={"/"}>
            <div className=" flex items-center w-14 md:w-40 xl:w-40 mx-4 ">
              <img
                className="hidden md:block xl:block"
                src="/icon.png"
                alt=""
              />


              <img
                className="block z-10 md:hidden xl:hidden"
                src="/icon.png"
                alt=""
              />
              <div
                className="mx-3 text-white font-bold text-3xl"
              >REMOVIE</div>
            </div>
          </Link>

          <div className=" hidden  md:flex gap-8 items-center  text-white  font-bold text-sm ">
            <Link to={"/"}>
              <p className="hover:scale-125 duration-300">Movies</p>
            </Link>

            <Link to={"/watchlist"}>
              <p className="hover:scale-125 duration-300">Watch List</p>
            </Link>
            {
              account && isAuthenticated &&
              <>
                <Link to={"/wishlist"}>
                  <p className="hover:scale-125 duration-300">Wish List</p>
                </Link>
              </>
            }

            <div>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="hover:scale-125 duration-300"
                    onClick={handleToggle}
                  >
                    More
                  </button>
                </div>
                {isOpenLog && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {
                        account && !isAuthenticated ?
                          <>
                            <Link to="/login"
                              className="hover:scale-125 duration-300 block text-right my-2"
                              onClick={handleToggle}
                            >
                              <p>Login</p>
                            </Link>
                            <Link to="/register"
                              className="hover:scale-125 duration-300 block text-right"
                              onClick={handleToggle}
                            >
                              <p>Register</p>
                            </Link>
                          </>
                          :
                          <p
                            className="hover:scale-125 duration-300 cursor-pointer block text-right"
                            onClick={handleLogout}
                          >
                            Logout
                          </p>
                      }

                    </div>
                  </div>

                )}
              </div>
            </div>


          </div>
          <span
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className=" block xl:hidden md:hidden"
          >
            {iconMenu}
          </span>
        </nav>
      </header>
    </>
  );
};
export default NavBar