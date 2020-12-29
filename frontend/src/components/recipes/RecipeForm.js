import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form'
import {useDropzone} from 'react-dropzone'
import ImageUploadIcon from "../icons/ImageUploadIcon";
import PropTypes from 'prop-types';
import Loader from "../common/Loader";

export default function RecipeForm(
  {
    name = '',
    content = '',
    image = null,
    isSaving = false,
    isUploadingImage = false,
    onRemoveImage,
    onImageUpload,
    onSave
  }) {

  const {register, handleSubmit} = useForm({
    defaultValues: {
      name, content
    }
  })

  const onDrop = useCallback(files => {
    const [file] = files;
    if (file) {
      onImageUpload(file)
    }
  }, [onImageUpload])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: '.jpg,.png',
  });

  const onSubmit = (data) => {
    const {name, content} = data;
    onSave(name, content)
  }

  const _renderImage = () => {
    return (
      <div className="blogs bg-white mr-5 flex items-center flex-col">
        <img src={image.url} alt="recipe cover" className="w-full max-w-screen-sm rounded-sm"/>
        <button onClick={() => onRemoveImage()}
                className="py-1 px-1 mt-4 px-6 text-white bg-red-600 inline-block rounded">
          Remove Cover
        </button>
      </div>
    )
  }

  const _renderUploadForm = () => {
    return(
      <div className="file-upload-container">
        <label className="block text-sm font-medium text-gray-700">
          Cover photo
        </label>
        <div
          className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" {...getRootProps()}>
          <div className={`space-y-1 text-center relative ${isUploadingImage ? 'opacity-50' : ''}`}>
            <ImageUploadIcon/>
            <div className="flex text-sm text-gray-600">
              <label
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-800 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload a file</span>
              </label>
              <input name="file-upload"
                     accept="image/*"
                     className="sr-only"
                     {...getInputProps()} disabled={isUploadingImage}/>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 3MB
            </p>
            { isUploadingImage && <Loader/> }
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-sm m-auto">
      <div className="py-5 bg-white">
        {(image && image.url) ? _renderImage() : _renderUploadForm() }
        <div className="grid grid-cols-x3 gap-6 mt-4">
          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="recipe-name" className="block text-sm font-medium text-gray-700">
              Recipe Name
            </label>
            <input type="text" name="name" id="recipe-name" ref={register}
                   className="block w-full border py-2 px-3 text-grey-darkest mt-1 rounded-md"
                   placeholder="Home-made pizza"/>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="recipe-content" className="block text-sm font-medium text-gray-700">
            Recipe Content
          </label>
          <div className="mt-1">
              <textarea id="recipe-content" rows="5"
                        name="content"
                        ref={register}
                        className="shadow-sm py-2 px-3 mt-1 block w-full sm:text-sm border rounded-md"
                        placeholder="Here is how you can make this awesome home-made pizza"/>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Describe all the steps necessary to prepare your meal.
            You can author it with <a className="underline" href="https://www.markdownguide.org/cheat-sheet/"
                                      target="_blank" rel="noopener noreferrer">Markdown.</a>
          </p>
        </div>

      </div>
      <div className="text-right">
        <button type="submit"
                disabled={isSaving}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </div>
    </form>
  )
}

RecipeForm.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  isUploadingImage: PropTypes.bool,
  isSaving: PropTypes.bool.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}