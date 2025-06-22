
import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Landing from './Components/Landing.tsx';
function App() {
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route path='/' element={<Landing/>}/>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
