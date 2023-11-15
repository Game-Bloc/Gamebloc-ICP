import React from "react";
import { Route, redirect, useNavigate } from "react-router-dom";
import CommonHeader from "./common/CommonHeader";
import { Container } from "./styles/commonStyles/Container.styles";
import Loader from "./components/Popup/Loader/Loader";
import AdminSideBar from "./components/adminComponents/AdminSideBar";
import { Wrapper } from "./styles/commonStyles/Wrapper";

interface Props {
    isAdmin: boolean
}

const AdminProtectedRoute: React.FC<Props & React.ComponentProps<typeof Route>>  = ({isAdmin, ...routesProps}) => {
    const navigate = useNavigate()
    if(isAdmin){
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
                 <AdminSideBar />
                 <Wrapper
                  xmdmargin="7rem 1rem 0 1rem"
                  xmdwidth="100%"
                  width="79%"
                  margin="7rem 0 0 19%"
                >

                <Route {...routesProps} />
                </Wrapper>

              </React.Suspense>
             </Container>
            </>
        )
    }
    navigate("/")

  return null
}

export default AdminProtectedRoute
