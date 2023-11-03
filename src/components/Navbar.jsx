import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Logo from "../img/logo.png";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import Us from "./Us";

function Navbar() {
  const { isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
    <div className="fixed w-full bg-emerald-300 border-2 border-pink-800 dark:bg-gray-800 dark:border-gray-700 top-0 right-0">
      <div className="px-3 py-4 lg:px-5 lg:pl-3 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a className="flex ml-2 md:mr-24">
              <img className="h-8 mr-3 md:mr-96" src={Logo} /> 
              <h1 className="ml-3 md:ml-36 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                La Michoacana
              </h1>
            </a>
  
            <div className="flex items-center ">
              <div className="flex items-center md:ml-96">
                <div className="flex text-sm bg-pink-200 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 ">
                  {isAuthenticated ? (
                    <>
                      {isMenuOpen && <Us />}
                      <a className="w-8 h-8 rounded-full">
                        <div
                          className="cursor-pointer text-black"
                          onClick={toggleMenu}
                        >
                          <button className="fas fa-bars text-2xl">
                            <BsFillPersonFill className="text-purple-600" size={30} />
                          </button>
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
  </nav>
  

  );
}

export default Navbar;

/*
<nav className="bg-emerald-300 my-3 flex justify-between py-5 px-10 border-2 border-pink-700 items-center">
      <Link className="flex items-center">
        <img className="w-14 mr-4 md:mr-10 lg:mr-96 " src={Logo} />
        <h1 className="text-2xl font-black">La Michoacana</h1>
      </Link>
      {isAuthenticated ? (
        <>
          <div className="cursor-pointer text-black" onClick={toggleMenu}>
            <i className="fas fa-bars text-2xl">
              <AiTwotoneSetting size={50} />
            </i>
          </div>
          {isMenuOpen && <Menu />}
        </>
      ) : (
        <>
          INSOEL
        </>
      )}
    </nav>*/
