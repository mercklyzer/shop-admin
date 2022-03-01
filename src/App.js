import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Products from './pages/Products';

function App() {
  return (
    <div className="App grid grid-cols-12">
      <Router>
        <Sidebar className="col-span-2"/>
        <Content className="col-span-10">
          <Routes>
            <Route path='/' exact element={ <Dashboard />}/>
            <Route path='/products' exact element={ <Products />}/>
          </Routes>
        </Content>
      </Router>
    </div>
  );
}

export default App;
