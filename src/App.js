import './App.css';
import Navbar from './components/Navbar' ;
import Home from './components/Home' ;
import About from './components/About' ;
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar/>
        <Alert message="wow!!!!!!!!"/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About/>} />  
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />   
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
