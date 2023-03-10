import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import FormPage from './pages/FormPage';
import ResultPage from './pages/ResultPage';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/form' element={<FormPage/>} />
          <Route path='/result' element={<ResultPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
