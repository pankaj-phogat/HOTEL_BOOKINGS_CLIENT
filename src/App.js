import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import TopNav from './components/TopNav';

//components
import Home from './booking/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import StripeCallback from './stripe/StripeCallback';
import LocationSearchInput from './components/GooglePlaces';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/dashboard/seller' component={DashboardSeller} />
        <PrivateRoute exact path='/hotels/new' component={NewHotel} />
        <PrivateRoute exact path='/stripe/callback' component={StripeCallback} />
        <PrivateRoute exact path='/location' component={LocationSearchInput} />
        <PrivateRoute exact path='/hotel/edit/:hotelId' component={EditHotel} />
        <Route exact path='/hotel/:hotelId' component={ViewHotel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
