import { removeFromTestimonials } from '@/app/lib/store/slices/settingsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

export default function TestimonialCard ({testimonial}) {
    const {body, person, position, image, id} = testimonial
    const dispatch = useDispatch()

    const deleteTestimonial = () => {
        fetch("/api/settings/testimonials", {
          method: "DELETE",
          body: JSON.stringify({ id: id }),
        })
          .then((response) => {
            dispatch(removeFromTestimonials(id))
          })
          .catch((err) => {
            console.log(err);
          })
    }

    return <>
        <div class="relative w-full bg-white border border-gray-200 rounded-lg shadow my-4">
            <div class="absolute right-4 bottom-4">
                <button id="dropdownButton" class="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" type="button">
                    <DeleteIcon color='error' onClick={deleteTestimonial}/>
                </button>
            </div>
            <div className='font-normal text-lg text-gray-700 p-4 text-center'>
                &quot;{body}&quot;
            </div>
            <div class="flex justify-center pb-2 gap-4">
                <img class="w-12 h-12 mb-3 rounded-full shadow-lg" src={image} alt={person}/>
                <div className='flex flex-col'>
                    <h5 class="mb-1 text-xl font-medium text-gray-900 ">{person}</h5>
                    <span class="text-sm text-gray-500 ">{position}</span>
                </div>
            </div>
        </div>
        </>
}