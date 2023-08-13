import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AuthContext from "./Components/context/authContext";
import {useCallback, useEffect, useState} from "react";
import authContext from "./Components/context/authContext";

function App() {
  const router = useRoutes(routes);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfos, setUserInfos] = useState(false)

  const login = useCallback(
      (userInfos , token) => {
        setToken(token)
        setIsLoggedIn(true)
        setUserInfos(userInfos)
        localStorage.setItem('user' , JSON.stringify({token}))
      } , []
  );

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  },[])

  useEffect(() => {
    const localStorageDate = JSON.parse(localStorage.getItem('user'))
    if(localStorageDate){
      fetch(`http://localhost:4000/v1/auth/me` , {
        headers: {
          'Authorization' : `Bearer ${localStorageDate.token}`
        }
      })
          .then(res => res.json())
          .then(userData => {
            setIsLoggedIn(true)
            setUserInfos(userData)
          })
    }
  }, [login , token]);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userInfos,
      login,
      logout
    }}>
      <div className="">
        <div className="">
          <Topbar />
          <Navbar />
        </div>
        <div className="">{router}</div>
        <div className="">
          <Footer />
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
