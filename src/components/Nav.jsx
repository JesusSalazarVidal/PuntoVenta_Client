import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Logo from "../img/logo.png";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import Us from "./Us";

function Nav() {
  const { isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="fixed top-0 z-50 w-full bg-emerald-300 border-b-2 border-pink-800 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-4 lg:px-5 lg:pl-3 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a className="flex ml-2 md:mr-24">
              <img className="h-8 mr-96" src={Logo} />
              <h1 className="ml-36 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                La Michoacana
              </h1>
            </a>

            <div className="flex items-center ">
              <div className="flex items-center ml-96">
                <div className="flex text-sm bg-gray-100 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 ">
                  {isAuthenticated ? (
                    <>
                      {isMenuOpen && <Us />}
                      <a className="w-8 h-8 rounded-full">
                        <div
                          className="cursor-pointer text-black"
                          onClick={toggleMenu}
                        >
                          <i className="fas fa-bars text-2xl">
                            <BsFillPersonFill size={30} />
                          </i>
                        </div>
                      </a>
                    </>
                  ) : (
                    <>INSOEL</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
