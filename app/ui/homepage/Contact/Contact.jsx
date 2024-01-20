'use client'
import './Contact.css'
import {useState} from 'react';
import Image from 'next/image';

export default function Contact () {
    const [message, setMessage] = useState(false);
   
    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);

        fetch("/api/messages", {
            method: "POST",
            body: formData,
        }).then((response) => {setMessage("Success")
        }).catch((err) => {setMessage("Error");})
    }

    return <section className="bg-gray-900 flex justify-around gap-2 px-8" id="contact">
        <div className='lg:flex justify-center items-center pb-3 lg:pt-5 hidden ps-8'>
            <img src='/assets/images/Contact.jpg' alt="" />
        </div>
        <div className="max-w-4xl flex flex-col justify-center items-center">
            {message === "Success"?<>
            <Image
                className="mb-8"
                src="/assets/images/success.png"
                alt="Success"
                width={250}
                height={250}
            />
            <h2 className='font-bold text-2xl lg:text-5xl mb-8 text-center'>We got your <span className='text-green-600'> Message</span></h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                We will get back to you in no time.</p>

            </>:<>
            <h3 className='section-header flex justify-center items-center text-2xl my-5'><span className='border-2 border-green-600 me-4 w-24'></span>Contact Us</h3>
            <h1 className='font-bold text-2xl lg:text-5xl mb-4 text-center'>Send us a Message <span className='text-green-600'>to get started</span></h1>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                Send us a message and we will get back to you ASAP with all required information.</p>
            <form onSubmit={handleSubmit} className="space-y-8 w-full">
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Phone</label>
                    <input type="text" id="phone" name="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
                </div>
                <div>
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                    <input type="text" id="name" name="name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us get to know you" required/>
                </div>
                <div className="sm:col-span-2">
                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                    <textarea id="message" name="message" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." required></textarea>
                </div>
                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-green-700 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Send message</button>
            </form>
            </>}

        </div>
    </section>
}