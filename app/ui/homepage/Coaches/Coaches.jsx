'use client'
import { useEffect, useState } from "react"

export default function Coaches () {
    const [coaches, setCoaches] = useState([])

    useEffect(()=>{
        // let mouseDown = false;
        // let startX, scrollLeft;
        // const slider = document.querySelector('.slider').parentElement();

        // const startDragging = (e) => {
        // mouseDown = true;
        // startX = e.pageX - slider.offsetLeft;
        // scrollLeft = slider.scrollLeft;
        // }

        // const stopDragging = (e) => {
        // mouseDown = false;
        // }

        // const move = (e) => {
        // e.preventDefault();
        // if(!mouseDown) { return; }
        // const x = e.pageX - slider.offsetLeft;
        // const scroll = x - startX;
        // slider.scrollLeft = scrollLeft - scroll;
        // }

        // // Add the event listeners
        // slider.addEventListener('mousemove', move, false);
        // slider.addEventListener('mousedown', startDragging, false);
        // slider.addEventListener('mouseup', stopDragging, false);
        // slider.addEventListener('mouseleave', stopDragging, false);

        fetch(`/api/coaches`)
        .then((response)=>{
            if (response.ok) return response.json();
            throw new Error('Something went wrong');
        })
        .then((responseJson) => setCoaches(responseJson))
        .catch((e)=> console.log(e))
    },[])

    return <section id="coaches" className="bg-gray-900 text-center py-2 lg:py-5 ">
        <div className='w-full max-w-7xl mx-auto my-16 px-4'>
            <h3 className='section-header flex justify-center items-center text-2xl my-5'><span className='border-2 border-green-600 me-4 w-24'></span>Meet Us</h3>
            <h1 className='font-bold text-2xl lg:text-5xl'>OUR <span className='text-green-600'>TEAM</span></h1>
            

            <div className="w-full flex flex-row justify-between overflow-x-auto slider mt-8 gap-4 scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent 
            scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded">
                {coaches?.map(coach => {
                    return <div key={coach.id} className='w-72 flex-shrink-0'>
                        <img className="brightness-50" src={coach.image || '/assets/images/trainee_annon.jpg'} alt={coach.fname} />
                        <h4 className='w-full caption'>{coach.fname + ' ' + coach.lname}</h4>
                    </div>
                })}
            </div>
        </div>
    </section>
}