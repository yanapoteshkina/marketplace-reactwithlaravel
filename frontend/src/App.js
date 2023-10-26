import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './container/Home';
import Signup from './container/Signup';
import Login from './container/Login';
import store from "./store/store"
import {Provider} from 'react-redux'
import Profile from './container/Profile';
import Detail from './container/Detail';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/detail/:id' component={Detail} />
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
