'use client'
import {useEffect, useState} from 'react';

export default function FormPropsTextFields() {
  const [settings, setSettings] = useState(false)
  const [status, setStatus] = useState(0)

  useEffect(()=>{
    fetch(`/api/settings`, { next: { tags: ['settings'] } })
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {setSettings(responseJson)})
    .catch((e)=>console.log(e))
  },[])

  const handleSubmit = async (event) => {
    setStatus(1)
    event.preventDefault()
    const formData = new FormData(event.target);
    await fetch("/api/settings", {method: "POST",body: formData})
    .then((response) => response.json())
    .then((jsonResponse) => setSettings(jsonResponse))
    .catch((err) => setStatus(-1))
    .finally(()=>setTimeout(()=>{setStatus(0)},5000))
  }

  return (<>
    <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div class="mb-5">
        <label for="video" class="block mb-2 text-sm font-medium text-gray-900">Video Link</label>
        <input type="text" name="video" id="video" defaultValue={settings?.video} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required/>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
      <p>{status==-1?"An error Happened":status==0?"":"Saving..."}</p>
    </form>
    
    </>
  );
}