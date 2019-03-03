import React, { Component } from 'react';
// import './App.css';
import { Provider} from 'react-redux';
import store from './store';
import Movies from './components/AllMovies';
import NewMovieForm from './components/NewMovieForm';
import Header from './components/Header';

class App extends Component {
  render() {
    
    return (
    
      <Provider store={store}>
      <div className="App">
      <Header/>
         <div className="container">
         
         <NewMovieForm/>
         
          <Movies/>
         </div>
      </div>
      </Provider>
    );
  }
}

export default App;
