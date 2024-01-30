'use client'

import { useEffect, useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Testimonial() {
    const testemonials = [{
        quote: "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
        name: "Micheal Gough",
        position: "CEO at Google"
    },{
        quote: "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
        name: "Micheal Gough2",
        position: "CEO at Google"
    },{
        quote: "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
        image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
        name: "Micheal Gough3",
        position: "CEO at Google"
    },]

    const [index, setIndex] = useState(0)

    const changeIndex = (val) => {

        let i = index + val
        console.log(i)

        if (i < 0) {
            i = testemonials.length - 1
        } else if (i >= testemonials.length) {
            i = 0
        }
        console.log(i)
        setIndex(i)
    }
    return (
        <section id="testimonials" className="bg-gray-900 px-4 lg:px-16">
        <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 flex justify-center items-center">
            <div className="h-14 w-14 bg-slate-950 rounded-full flex items-center justify-center cursor-pointer"><ChevronLeftIcon fontSize="large" onClick={() => changeIndex(-1)}/></div>
            <figure className="max-w-screen-md mx-auto transition-all">
                <svg class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                </svg> 
                <blockquote>
                    <p class="text-2xl font-medium text-gray-900 dark:text-white">
                        &quot;{testemonials[index].quote}&quot;
                    </p>
                </blockquote>
                <figcaption class="flex items-center justify-center mt-6 space-x-3">
                    <img class="w-6 h-6 rounded-full" src={testemonials[index].image} alt="profile picture"/>
                    <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                        <div class="pr-3 font-medium text-gray-900 dark:text-white">{testemonials[index].name}</div>
                        <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{testemonials[index].position}</div>
                    </div>
                </figcaption>
            </figure>
            <div className="h-14 w-14 bg-slate-950 rounded-full flex items-center justify-center cursor-pointer"><ChevronRightIcon fontSize="large" onClick={() => changeIndex(1)}/></div>
        </div>
        </section>
    )
  }
