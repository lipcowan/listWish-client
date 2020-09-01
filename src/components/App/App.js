import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import Header from '../Header/Header';
// import PrivateRoute from '../Utils/PrivateRoute';
// import PublicRoute from '../Utils/PublicRoute';
import ListWishPage from '../../routes/ListWishPage/ListWishPage';


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
           {/* <PublicRoute />
           <PrivateRoute /> */}
          </Switch>
        </main>
      </div>
    )
  }

}

export default App;
