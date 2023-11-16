import React, { useEffect } from 'react'
import {Route, RouteProps, redirect, useNavigate } from 'react-router-dom'
import CommonHeader from './common/CommonHeader'
import { Container } from './styles/commonStyles/Container.styles'
import Loader from './components/Popup/Loader/Loader'
import SideBar from './pages/SideBar'
import { Wrapper } from './styles/commonStyles/Wrapper'

interface Props {
    isAuth: boolean
}

const ProtectedRoutes: React.FC<Props & React.ComponentProps<typeof Route>> = ({isAuth, ...routesProp }) => {
    const navigate = useNavigate();

    useEffect(()=>{
       if (!isAuth) {
      // If the user is not authenticated, redirect to the homepage
      navigate("/")
    }
    },[isAuth, navigate])

    if(isAuth){
        return(
            <>
             <CommonHeader />
             <Container display="flex" flexDirection="row">
              <React.Suspense
                fallback={
                  <Container
                    width="100%"
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Loader />
                  </Container>
                }
              >
                 <Wrapper
                  xmdmargin="7rem 1rem 0 1rem"
                  xmdwidth="100%"
                  width="79%"
                  margin="7rem 0 0 19%"
                >

            <Route {...routesProp} />
                </Wrapper>
                 <SideBar />
                
              </React.Suspense>
              </Container>
            </>
            
        ) 
    }
    redirect("/")
  return  null
   
  
}

export default ProtectedRoutes
