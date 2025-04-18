import './App.css';
import { useReducer } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceGrid from './components/ServiceGrid';
import SavedList from './components/SavedList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import serviceReducer from './reducers/serviceReducer';
import { sortService } from './utils/sortService';
import ServiceForm from './components/ServiceForm';

function App() {

  // const [services, setServices] = useState([]);
  const [savedList, setSavedList] = useState([]);

  const initialState = {services: [], editingService: null, sortPreference: "High to Low"};
  const [state, dispatch] = useReducer(serviceReducer, initialState);
  const sortedServices = sortService(state.services, state.sortPreference);

  // useEffect(() => {
  //   fetch("services.json")
  //   .then(response => response.json())
  //   .then(data => setServices(data))
  // }, []);

  const toggleSavedList = (serviceId) => {
    setSavedList(prev => 
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : 
      [...prev, serviceId]
    ) 
  } 

  return (
    <div className="App">
      <div className='container'>
        <Header></Header>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/savedList">Saved Services</Link>
              </li>
              <li>
                <Link to="/addService">Add Service</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" 
            element={<ServiceGrid services={state.services} savedList={savedList} toggleSavedList={toggleSavedList}/>}></Route>
            <Route path="/savedList"
            element={<SavedList savedList={savedList} services={state.services} toggleSavedList={toggleSavedList}/>}></Route>
            <Route path='/addService'
            element={<div>
                <h1 className="title">Service Registry</h1>
                <ServiceForm dispatch={dispatch} editingService={state.editingService}></ServiceForm>
            </div>}>
            </Route>
          </Routes>
        </Router>

      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
