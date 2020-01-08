import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Navbar from './components/navbar.component'
import MainMenu from './components/mainmenu.component'
import TaskManager from './components/taskmanger.component'
import ShowTask from './components/showtask.component'
import EditProfile from './components/edit-profile.component'
import ListTask from './components/list-task.component'

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path='/' component={MainMenu} />
      <Route path='/taskmanager' component={TaskManager} />
      <Route path='/showtask' component={ShowTask} />
      <Route path='/editprofile' component={EditProfile} />
      <Route path='/listtask' component={ListTask} />
    </Router>
  );
}

export default App;
