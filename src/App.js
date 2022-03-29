import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <div className="App grid grid-cols-12">
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login />} />
          {[
            '/', 
            '/products', 
            '/products/add', 
            '/orders', 
            '/users', 
            '/products/edit/:productId'
          ].map((path, i) => <Route path={path} key={i} element={<Main />} />)}
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
