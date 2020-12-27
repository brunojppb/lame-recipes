import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Routes from "../../routes";

export default function RecipeItem({id, name, cover}) {

  const recipePath = Routes.recipePath(id)

  return(
    <Link to={recipePath} className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col items-center relative transform hover:scale-105 duration-500">
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
    </Link>
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