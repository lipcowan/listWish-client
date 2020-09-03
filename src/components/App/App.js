import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import ListWishPage from '../../routes/ListWishPage/ListWishPage';
import ListWish from '../../routes/ListWish/ListWish';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';



class App extends Component {
  state = { hasError: false}

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true } 
  }

  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
           <Route
             exact
             path={'/'}
             component={ListWishPage}
           />
           <PublicOnlyRoute
             path={'/login'}
             component={LoginPage}
           />
           <PublicOnlyRoute
             path={'/register'}
             component={RegistrationPage}
           />
           <PrivateRoute
             path={'/list/:listId'}
             component={ListWish}
           />
           <Route
             component={NotFoundPage}
           />
          </Switch>
        </main>
      </div>
    )
  }

}

export default App;
