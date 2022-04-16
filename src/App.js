import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from "./pages/NotFound";

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
            '/users/:userId',
            '/products', 
            '/products/:productId', 
            '/products/add', 
            '/orders', 
            '/users', 
            '/products/edit/:productId',
            '/orders',
            '/orders/:orderId'
          ].map((path, i) => <Route path={path} key={i} element={<Main />} />)}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
