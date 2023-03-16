import React from 'react'
import NoAuthRoute from './routes/NoAuthRoute'
import AuthRoutes from './routes/AuthRoutes'
import Category from './pages/category/Category'
import { useAuth } from './context/AuthContext'
const App = () => {
  const {user,role,token,checked} =useAuth();


  function DetermineRoute(){
     if(user && token && role){
      return <AuthRoutes />
     }else{
      return <NoAuthRoute />
     }
  }
  return (
   <>
   {checked ? <DetermineRoute /> : <h2>Loading...</h2>}
   </>
  )
}
export default App;
