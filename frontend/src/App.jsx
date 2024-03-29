import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import PostPage from './pages/PostPage';
import CommunityPosts from './pages/CommunityPosts';
import AboutUsPage from './pages/About-us';
import MapPage from './pages/MapPage';
import ArticlesPage from './pages/ArticlesPage';


export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <main id="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/posts' element={<CommunityPosts />} />
        <Route path='/posts/:id' element={<PostPage />} />
        <Route path='/map' element={<MapPage/>} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/About-us' element={<AboutUsPage />} />
        <Route path='/Articles' element={<ArticlesPage />} />
      </Routes>
    </main>
    <Footer />
  </>;
}
