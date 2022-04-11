import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    // <div className="App grid grid-cols-12">
    <div className="App h-screen bg-primary-200 overflow-x-hidden overflow-y-scroll">
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login />} />
          {[
            '/', 
            '/users',
            '/products', 
            '/products/:productId', 
            '/products/add', 
            '/orders', 
            '/users', 
            '/products/edit/:productId',
            '/orders',
            '/orders/:orderId'
          ].map((path, i) => <Route path={path} key={i} element={<Main />} />)}
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
