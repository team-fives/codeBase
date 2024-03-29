import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import logo from "../imgs/logo.png"
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);

  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isCommunityPage = location.pathname === '/posts';
  const isArticlesPage = location.pathname === '/Articles';

  const position = (isHomepage || isArticlesPage) ? 'fixed' : 'relative';
  const textColor = isCommunityPage ? 'black' : 'white';
  const calculatedOpacity = (isHomepage || isArticlesPage) ? `${bgOpacity}` : '1';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(1, Math.round(scrollY / 20) * 0.7);
      setBgOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{ backgroundColor: `rgb(68,137,96, ${calculatedOpacity})`, zIndex: '10', alignItems: "center", height: "4.5rem" }}
      className={`${textColor} md:flex md:justify-between md:items-center ${position} top-0 sm:px-12 px-4 py-2 w-full height-64 z-10`}>
        <Flex align="center" className="PureLink">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-10 mr-2" alt="logo" />
            {!isHomepage && <span style={{ fontWeight: 500 }}>PureLink</span>}
          </a>
        </Flex>
        <nav>
          <ul className="md:flex md:space-x-1 md:items-center">
            <div className="relative flex flex-col items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="p-4 text-black font-weight-500">
                Services
                {isOpen && (
                  <motion.div
                    className="absolute top-14 right-0 z-50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="m-2 w-20">
                      <motion.li whileHover={{ scale: 1.1, backgroundColor: '#45885f', borderRadius: '5px'}} whileTap={{ scale: 0.9 }}>
                        <NavLink className="block py-1" to="/posts">Posts</NavLink>
                      </motion.li>
                      <motion.li whileHover={{ scale: 1.1, backgroundColor: '#45885f', borderRadius: '5px' }} whileTap={{ scale: 0.9 }}>
                        <NavLink className="block py-1" to="/about-us">About Us</NavLink>
                      </motion.li>
                      <motion.li whileHover={{ scale: 1.1, backgroundColor: '#45885f', borderRadius: '5px' }} whileTap={{ scale: 0.9 }}>
                        <NavLink className="block py-1" to="/Articles">Articles</NavLink>
                      </motion.li>
                    </ul>
                  </motion.div>
                )}
              </button>
            </div>
            {currentUser
                ? <li><NavLink className={`p-4 ${textColor}, font-weight: 500`} to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
                : <>
                  <li><NavLink className={`p-4 ${textColor}, font-weight: 500`} to='/login'>Login</NavLink></li>
                  <li><NavLink
                      style={{ backgroundColor: "#45885f", borderRadius: "10px" }}
                      className={`p-4 ${textColor}, font-weight: 500`}
                      to='/sign-up'>
                      Sign Up
                    </NavLink></li>
                </>
              }
          </ul>
        </nav>
    </header>
  );
}