import './App.css';
import CourseList from './components/CoursesList';
import MyNavbar from './components/MyNavbar';
import StudentList from './components/StudentList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className=' w-screen h-screen flex flex-col items-center gap-5 bg-gradient-to-b from-white to-blue-500'>
        <MyNavbar />
        <Routes>
          <Route exact path='/' element={<StudentList />} />
          <Route exact path='/courses' element={<CourseList />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
