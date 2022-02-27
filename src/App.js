import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App grid grid-cols-12">
      <Sidebar className="col-span-2"/>
      {/* <Sidebar className="col-span-10 bg-blue-700"/> */}
    </div>
  );
}

export default App;
