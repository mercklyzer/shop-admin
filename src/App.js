import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App grid grid-cols-12">
      <Sidebar className="col-span-2"/>
      <Content className="col-span-10">
        <Dashboard />
      </Content>
    </div>
  );
}

export default App;
