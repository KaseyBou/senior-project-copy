import React, { useState} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { ThemeContext, themes } from './context/themeContext';
import { Outlet, useNavigate} from 'react-router-dom';

function App() {

  const navigate = useNavigate()
  //const [theme, setTheme] = useState(themes.light);

  /*const toggleTheme = () => {

    setTheme((previousThemeValue) => previousThemeValue === themes.dark ? themes.light : themes.dark);

  };*/

  //document.body.setAttribute("style", `background: ${theme.background};`);

  return (
    <div className="App">
      <Navbar/>
      <div className='body'>
        <div id='app-root'>
          <Outlet/>
        </div>
        
        <div id='modal-root'></div>
      </div>
    </div>
  );
}

export default App;
