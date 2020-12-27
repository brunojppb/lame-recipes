import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form'
import {useDropzone} from 'react-dropzone'
import ImageUploadIcon from "../icons/ImageUploadIcon";
import PropTypes from 'prop-types';

export default function RecipeForm({
 name = '',
 content = '',
 isSaving = false,
 onImageUpload,
 onSave}) {

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
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: '.jpg,.png',
  });

  const onSubmit = (data) => {
    const {name, content} = data;
    console.log('saving recipe', data)
    onSave(name, content)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-5 bg-white">
        <div className="file-upload-container">
          <label className="block text-sm font-medium text-gray-700">
            Cover photo
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" {...getRootProps()}>
            <div className="space-y-1 text-center">
              <ImageUploadIcon/>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-800 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                </label>
                <input name="file-upload"
                       accept="image/jpg,image/jpeg,image/png"
                       className="sr-only"
                       {...getInputProps()}/>
                {isDragActive ? <p className="pl-1">or drag and drop</p> : null }
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 3MB
              </p>
            </div>
          </div>
        </div>

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
            You can author it with <a className="underline" href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">Markdown.</a>
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
  isSaving: PropTypes.bool.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}