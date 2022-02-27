import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  return (
    <div className="App grid grid-cols-12">
      <Sidebar className="col-span-2"/>
      <Content className="col-span-10"/>
    </div>
  );
}

export default App;
