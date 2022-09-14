import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Header from "../header/header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-сonstructor/burger-сonstructor";
import LoginPage from "../../pages/login.jsx";
import RegisterPage from "../../pages/register.jsx";
import ForgotPasswordPage from "../../pages/forgot-password.jsx";
import ResetPasswordPage from "../../pages/reset-password.jsx";
import ProfilePage from "../../pages/profile.jsx";
import ProtectedRoute from "../protected-route.jsx";
import ErrorPage from "../../pages/404Page.jsx";
import Feed from "../../pages/feed.jsx";
import OrderInfo from "../order-info/order-info.jsx";
import OrderInfoFull from "../../pages/order-info-full.jsx";
import main from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getUser } from "../../services/actions/auth";
import IngredientDetailsFull from "../../pages/ingredient-details-full"
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async() => {
    await dispatch(getIngredients());
    await dispatch(getUser());
    setUserLoaded(true)
  };

  useEffect(() => {
    init();
    history.replace({ state: null })
  }, []);

  const handleCloseModal = () => {
    history.goBack();
  };

  const background = location.state && location.state.background;

  if (!isUserLoaded) {
    return null;
  }

  return (
    <>
      <Header />
      <Switch location={background || location} >
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage/>
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordPage/>
        </Route>
        <Route path='/reset-password'>
          <ResetPasswordPage/>
        </Route>
        <Route path='/profile/orders/:id' exact={true}>
          <OrderInfoFull/>
        </Route>
        <ProtectedRoute path='/profile'>
          <ProfilePage/>
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <main className={main.app}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </Route>
        <Route path='/ingredients/:id' >
          <IngredientDetailsFull />
        </Route>
        <Route path='/feed' exact={true}>
          <Feed/>
        </Route>
        <Route path='/feed/:id' >
          <OrderInfoFull/>
        </Route>
        <Route>
          <ErrorPage/>
        </Route>
      </Switch>
      { background && (
       <Switch>
          <Route path='/ingredients/:id' >
            <Modal onClose={handleCloseModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/feed/:id' >
            <Modal onClose={handleCloseModal}>
              <OrderInfo/>
            </Modal>
          </Route>
          <Route path='/profile/orders/:id' >
            <Modal onClose={handleCloseModal}>
              <OrderInfo/>
            </Modal>
          </Route>
       </Switch>)}
    </>
  );
}

export default App;
