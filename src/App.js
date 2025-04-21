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
import RequestForm from './components/RequestForm';
import RequestGrid from './components/RequestGrid';
import requestReducer from './reducers/requestReducer';

function App() {

  // const [services, setServices] = useState([]);
  const [savedList, setSavedList] = useState([]);

  const serviceInitialState = {services: [], editingService: null, sortPreference: "High to Low"};
  const requestInitialState = {requests: [], editingRequest: null, sortPreference: "High to Low"};
  const [serviceState, serviceDispatch] = useReducer(serviceReducer, serviceInitialState);
  const [requestState, requestDispatch] = useReducer(requestReducer, requestInitialState);
  const [showRequests, setShowRequests] = useState(false);
  const sortedServices = sortService(serviceState.services, serviceState.sortPreference);

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
              <li>
                <Link to="/addRequest">New Request</Link>
              </li>
            </ul>
          </nav>
          <Routes>
          <Route path="/" 
            element={
              <>
                <div style={{ margin: '20px 0' }}>
                  <button onClick={() => setShowRequests(prev => !prev)}>
                    {showRequests ? "Show Services" : "Show Requests"}
                  </button>
                </div>
                {showRequests ? (
                  <RequestGrid
                    requests={requestState.requests}
                    savedList={savedList}
                    toggleSavedList={toggleSavedList}
                  />
                ) : (
                  <ServiceGrid
                    services={serviceState.services}
                    savedList={savedList}
                    toggleSavedList={toggleSavedList}
                  />
                )}
              </>
            }
          />
            <Route path="/addService" element={<div>
              <h1 className='title'>Service Registry</h1>
              <ServiceForm dispatch={serviceDispatch} editingService={serviceState.editingService}></ServiceForm>
            </div>}></Route>
            <Route path="/addRequest" element={<div>
              <h1 className='title'>Request Registry</h1>
              <RequestForm dispatch={requestDispatch} editingRequest={requestState.editingRequest}></RequestForm>
            </div>}></Route>
            <Route path="/savedList"
            element={<SavedList savedList={savedList} services={serviceState.services} toggleSavedList={toggleSavedList}/>}></Route>
          </Routes>
        </Router>

      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
