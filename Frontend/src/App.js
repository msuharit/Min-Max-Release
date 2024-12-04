import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import TodoPage from './components/TodoPage'
import AppTest from './components/AppTest'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/TodoPage" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
