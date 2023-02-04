import './App.css';
import Routing from './Routes' ;
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Sequence Aligner App </h1>
      </header>
      <article>
        <Router>
          <Routing/>      
        </Router>
      </article>
    </div>
  );
}

export default App;
