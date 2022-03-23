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

function App() {
  return (
    <div className="App grid grid-cols-12">
      {/* <Router>
        <Sidebar className="col-span-2"/>
        <Content className="col-span-10">
          <Routes>
            <Route path='/' exact element={ <Dashboard />}/>
            <Route path='/products' exact element={ <Products />}/>
            <Route path='/products/add' exact element={ <AddProduct />}/>
          </Routes>
        </Content>
      </Router> */}
      <Login />
    </div>
  );
}

export default App;
