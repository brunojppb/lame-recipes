import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeItem({id, name, cover}) {

  return(
    <div className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col items-center relative">
      <div className="bg-white shadow-lg rounded-md mt-5">
        <img
          src={cover?.url || 'https://source.unsplash.com/MNtag_eXMKw/1600x900'}
          className="rounded-t-md object-cover w-full h-40"
          alt="recipe"
        />
        <div className="py-3 px-3">
          <span className="font-bold text-gray-800 text-lg">{name}</span>
        </div>
      </div>
    </div>
  )

}

RecipeItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cover: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
}