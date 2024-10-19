import { Switch, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Success from './components/Success';

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </>
  )
}

export default App
