import { addToTestimonials, removeFromTestimonials } from '@/app/lib/store/slices/settingsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function TestimonialForm () {
    const [loading, setLoading] = useState(false)
    const emptyTestimonial = {
        body: "",
        position: "",
        image: "",
        person: ""
    }
    const [testimonial, setTestimonial] = useState({...emptyTestimonial})
    const dispatch = useDispatch()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        formData.delete('file-upload')
        formData.set('image', testimonial.image)

        fetch("/api/settings/testimonials", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            dispatch(addToTestimonials(jsonResponse))
            setTestimonial({...emptyTestimonial})
            e.target.reset()
        })
          .catch((err) => console.log(err))
          .finally(() => setLoading(true));
    }

    const handleFileChange = (e) => {
        const formData = new FormData()
        formData.append("image",e.target.files[0])
    
        fetch('https://api.imgbb.com/1/upload?key=19eef0c30d4e456159d5e0b43f9f632b', 
          {method: 'POST', body: formData})
        .then(res => res.json())
        .then(jsonResponse => {
            setTestimonial({...testimonial, image: jsonResponse.data.url})
        })
        .catch(err => console.log(err));
      }
      
    return <>
        <form className='w-full bg-white border border-gray-200 rounded-lg shadow my-4 p-4' onSubmit={handleFormSubmit}>
            <div>
                <label for="body" class="block text-sm font-medium leading-6 text-gray-900">Quote</label>
                <div class="mt-2">
                    <textarea required id="body" name="body" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
                <div class="sm:col-span-2 sm:col-start-1">
                    <label for="file-upload" class="block text-sm font-medium leading-6 text-gray-900">Photo
                        <div class="mt-2 flex items-center gap-x-3">
                            {testimonial.image ? <>
                                <img class="w-12 h-12 mb-3 rounded-full shadow-lg" src={testimonial.image} alt={testimonial.person}/>
                            </>
                            :<>
                                <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                </svg>
                                <input required onChange={e => handleFileChange(e)} id="file-upload" name="file-upload" type="file" class="sr-only"/> 
                                <p type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</p>
                            </>}
                        </div>
                    </label>
                </div>

                <div class="sm:col-span-2">
                <label for="person" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div class="mt-2">
                    <input required type="text" name="person" id="person" placeholder='Person Name' class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                <div class="sm:col-span-2">
                <label for="position" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                <div class="mt-2">
                    <input required type="text" name="position" id="position" placeholder='Africa Champion' class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit" disabled={loading} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
            </div>
            </form>
        </>
}