import './App.css';
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Students from "./pages/StudentPage/Students";
import AddStudentButton from './pages/AddStudentButton/AddStudentButton';
import SearchPage from './pages/SearchPage/SearchPage';
import SearchThanThanh from './pages/SearchThanThanh/SearchThanThanh';
import ImagePage from './pages/ImagePage/ImagePage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/addStudent" element={<AddStudentButton />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:name" element={<SearchPage />} />
          <Route path="/searchthanthanh" element={<SearchThanThanh />} />
          <Route path="/image/:id" element={<ImagePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
