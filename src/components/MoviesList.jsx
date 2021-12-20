import React from 'react'
import MoviesCard from './MoviesCard'

function MoviesList({movies}) {
    return (
        <div className='row'>
           {
               movies.map((movie, index) => (
                   <div className='col-2'>
                       <MoviesCard movie={movie} key={index}/>
                       </div>
               ))
           }
        </div>
    )
}

export default MoviesList
