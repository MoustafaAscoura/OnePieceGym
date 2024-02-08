'use client'
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorStatus, setSettings, setVideo } from '@/app/lib/store/slices/settingsSlice';
import TestimonialCard from '@/app/ui/dashboard/settings/testimonialCard';
import { Divider } from '@mui/material';
import TestimonialForm from '@/app/ui/dashboard/settings/testimonialForm';

export default function FormPropsTextFields() {
  const {testimonials, images, video, status} = useSelector(state => state.settingsList)
  const [saved, setSaved] = useState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (!status) {
      fetch(`/api/settings`, { next: { tags: ['settings'] } })
      .then((response)=>{
          if (response.ok) {
              return response.json();
          }
          throw new Error('Something went wrong');
      })
      .then((responseJson) => {dispatch(setSettings(responseJson))})
      .catch(e => dispatch(setErrorStatus(-1)))
    }
  },[])

  const handleSubmit = async (event) => {
    setSaved(1)
    event.preventDefault()
    const formData = new FormData(event.target);
    await fetch("/api/settings", {method: "POST",body: {
      video: video,
      images: images
    }})
    .then(res => setSaved(2))
    .catch((err) => dispatch(setErrorStatus(-1)))
    .finally(()=>setTimeout(()=>{setSaved(0)},5000))

  }

  return (<>
    <div class="max-w-xl mx-auto" >
      <form onSubmit={handleSubmit}>
        <div class="mb-5 pt-5">
          <label for="video" class="block mb-2 text-sm font-medium text-gray-900">Video Link</label>
          <input type="text" name="video" id="video" value={video} onChange={e => dispatch(setVideo(e.target.value))} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required/>
        </div>
        <button type="submit" class="w-full my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
        <Divider class="my-4" />

      </form>
      <div class="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">Testemonials</label>
        <div>
          {testimonials.map((testimonial, index) => {
            return <TestimonialCard key={index} testimonial={testimonial}/>
          })}
          <TestimonialForm />
        </div>
      </div>
      <p>{saved==-1?"An error Happened"
      :saved==2?"Saved Successfully"
      :saved==1?"Saving...":""}</p>
    </div>
    
    </>
  );
}