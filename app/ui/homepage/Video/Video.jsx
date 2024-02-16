'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

function StandardImageList({imagesData}) {
    const [shownIndex, setShownIndex] = useState(0)
    const changeShowIndex = (i) => {
        let _index = shownIndex + i
        if (_index >= imagesData.length) {
            _index = 0
        } else if (_index < 0) {
            _index = imagesData.length - 1
        }
        setShownIndex(_index)
    }

  return (
    <div className="relative">
        <div class="p-8 lg:p-32 lg:py-10 flex justify-center">
            <div className="relative max-w-screen-lg">
                {imagesData.map((item, index) => (
                    <div key={index} className={`${index == shownIndex ? '':'absolute opacity-0'} flex justify-center transition-all duration-500 ease-in-out `}>
                        <img src={item} alt={`onepiece gym ${index}`} 
                        class='max-h-screen rounded-lg'/>
                    </div>
                ))}
            </div>

        </div>    
        <button onClick={() => changeShowIndex(-1)} type="button" class="absolute top-0 start-8 lg:start-36 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span class="inline-flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-green-900/70 group-hover:bg-green-900/50 group-focus:ring-4 group-focus:ring-green-600 group-focus:outline-none">
                <svg class="w-6 h-6 text-green-600 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button onClick={() => changeShowIndex(1)} type="button" class="absolute top-0 end-8 lg:end-36 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span class="inline-flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-green-900/70 group-hover:bg-green-900/50 group-focus:ring-4 group-focus:ring-green-600 group-focus:outline-none">
                <svg class="w-6 h-6 text-green-600 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="sr-only">Next</span>
            </span>
        </button>
        </div>

  );
}

export default function Video () {
    const [settings, setSettings] = useState({})

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

    return <> { settings.video? <section>
            <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"></script>
            <div className="fb-video" data-href={settings.video}  
            data-allowfullscreen="true" data-width="1920"></div>
        </section>:<></>}
        { settings.images?.length? <>
        <section className="p-4 lg:px-8">
            <StandardImageList imagesData={settings.images} />
        </section>
        </> : <></>}
        </>
}