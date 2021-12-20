import React from 'react'

function MoviesCard({movie}) {
    return (
        <div className='max-w-sm overflow-hidden mt-3 mb-6 rounded-lg shadow-2xl'>
            <img src={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`} alt="404" className='w-100 object-cover' height="200px"/>

            <div className='py-2 bg-white text-black font-bold flex justify-evenly'>
                <div className="flex flex-col justify-center text-truncate">
                    {movie.original_title}
                </div>
            </div>
        </div>
    )
}

export default MoviesCard
