import React from 'react';
import './App.css';
import MasterWrapper from './component/MasterWrapper'
import {
  BrowserRouter as Router,
} from "react-router-dom";

// ------------------------ React Redux Firebase Setup ----------------------------------------------
import {fbConfig} from './secret/fbConfig'

import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}
 
// ------------------------------------------------------------------------------------

function App() {
  return (
    <div className="App">
      {/* firebase redux support */}
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>

          {/* react router support */}
          <Router>
            <MasterWrapper />
          </Router>

        </ReactReduxFirebaseProvider>
      </Provider>

    </div>
  );
}

export default App;




