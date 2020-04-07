import React, {lazy, Suspense, Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route , Switch, Redirect, NavLink} from 'react-router-dom'
// import Homepage from './containers/Homepage/index'
// import ErrorPage from './containers/ErrorPage/index'
// import DetailNews from './containers/detailItem/index'
// import ProtectPage from './containers/ProtectedPage/index'

const Homepage = lazy(()=>import('./containers/Homepage/index'));
const ErrorPage = lazy(()=>import('./containers/ErrorPage/index'));
const DetailItem = lazy(()=>import('./containers/detailItem/index'));
const ProtectPage = lazy(()=>import('./containers/ProtectedPage/index'));

const PrivateRoute = () =>{
  const auth = false;
  return(
    auth ? <ProtectPage/> :
    <div>
      You don't have permission.
      <p><NavLink activeStyle={{fontWeight:'bold', color:'red'}} to ='/'>Homepage</NavLink></p>
      {/* <Redirect path='/'/> */}
    </div>
  );
}

class lifeCycle extends Component{
  constructor(props) {
    super(props);
    console.log(0);
  }
  componentWillMount(){
    console.log(1);
  }
  componentDidMount(){
    console.log(2);
  }
  componentWillReceiveProps(nextProps){
    console.log(3);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(4);
  }
  componentDidUpdate(prevProps, prevState){
    console.log(5);
  }
  componentWillUnmount(){
    console.log(6);
  }
}

const app = (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/' exact component={Homepage}/>
        <Route path='/error' component={ErrorPage}/>
        <Route path='/detail' component={DetailItem}/>
        <PrivateRoute path='/profile'/>
        <Redirect from='/404' to ='/error'/>
      </Switch>
    </Suspense>
  </Router>
)
ReactDOM.render(app,document.getElementById('root'));

serviceWorker.unregister();
