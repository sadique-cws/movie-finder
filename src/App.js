import React, { useReducer,useEffect } from 'react';
import axios from 'axios'
import {CircularProgress, Typography} from '@mui/material';
import MoviesList from './components/MoviesList';

function App() {
  const ACTIONS  = {
    TYPE_SEARCH : "TYPE_SEARCH",
    SUBMIT_SEARCH : "SUBMIT_SEARCH",
    FETCH_DATA : "FETCH_DATA",
    FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
    FETCH_DATA_FAIL : "FETCH_DATA_FAIL"
  }
  const reducer = (state, action) => {
    switch(action.type){
      case ACTIONS.TYPE_SEARCH:
        return {
          ...state,
          typedInMovieTitle:action.value
        };
      
      case ACTIONS.SUBMIT_SEARCH:
        return {
          ...state,
          submittedMovieTitle : state.typedInMovieTitle
        };
      
      case ACTIONS.FETCH_DATA:
        return {
          ...state,
          isLoading:true,
        }
        
      case ACTIONS.FETCH_DATA_SUCCESS:
        return {
          ...state,
          movies: action.value,
          isLoading: false,
        }
      
      case ACTIONS.FETCH_DATA_FAIL:
        return {
          ...state,
          isError: true
        }
        default:
          return state;
    }
}
const initialState = {
  typedInMovieTitle : "",
  submittedMovieTitle: "",
  movies : [],
  isLoading: false,
  isError : false,
}
  const [state, dispatch] = useReducer(reducer, initialState);
  const API_KEY = "16c66b0f7fd3c3447e7067ff07db3197";
  // https://api.themoviedb.org/3/search/

  useEffect(() => {
    if(state.submittedMovieTitle){
      const fetchData = async () => {
        dispatch({type: "FETCH_DATA"});
        try{
          const result = await axios(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${state.submittedMovieTitle}`
          );
          dispatch({
            type: ACTIONS.FETCH_DATA_SUCCESS,
            value: result.data.results,
          });
          
        } catch (error){
          dispatch({type: "FETCH_FAILURE"})
        }
      };
       fetchData();
    }
  },[state.submittedMovieTitle]);

  

  

  function onChange(event){
      dispatch({
          type: ACTIONS.TYPE_SEARCH,
          value : event.target.value,
      });
  }

 

  function onSubmit(event){
      event.preventDefault();

      dispatch({
        type: ACTIONS.SUBMIT_SEARCH
      });

      console.log(state.movies)

  }
    return (
    <div className="container-fluid py-5">
      <header className="text-center">
        <h2 className="display-6 text-white">Movie <span className="text-danger">Finder</span></h2>
      </header>

     <div className="container">
        <div className="row">
            <div className="col-3 mx-auto">
                <form onSubmit={onSubmit}>
                  <input type="text" className="form-control border-0 shadow-none" placeholder="Type movie title" onChange={onChange}/>
              </form>
              
              
            </div>
                {state.isLoading ? (
                  <CircularProgress color="secondary"/>
              )
              : state.isError ? (
                  <Typography component="p">
                    Data fetch failed
                  </Typography>
              ) :
              (
                <MoviesList movies={state.movies}/>
              )}
        </div>
     </div>
    </div>
  );
}

export default App;
