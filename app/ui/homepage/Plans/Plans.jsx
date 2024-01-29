'use client'

import {useEffect, useState} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

export default function Plans () {
    const [type, setType] = useState("basic")
    const handleChange = (event, newType) => setType(newType || type);
    const [programs, setPrograms] = useState([])

    useEffect(()=>{
        $(".slider-child").draggable({ 
            axis: "x",
            revert: true
        });

        fetch(`/api/programs`)
        .then((response)=>{
            if (response.ok) return response.json();
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            setPrograms(responseJson.map(program => {
                program.trainees_count = program._count.trainees || 0
                return program
            }))
        }).catch((e)=> console.log(e))
    },[])

    return <section id="plans" className="bg-slate-950">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16 lg:px-8">
            <div className="mx-auto max-w-screen-md text-center mb-2 lg:mb-4">
                <h3 className='section-header flex justify-center items-center text-2xl my-5'><span className='border-2 border-green-600 me-4 w-24'></span>Pricing</h3>
                <h1 className='font-bold text-2xl lg:text-5xl'>PLANS <span className='text-green-600'>&OFFERS</span></h1>
            </div>
            <div className='flex justify-center'>
                <ToggleButtonGroup
                  color="success"
                  value={type}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  className='rounded-lg'
                  size="large"
                >
                  <ToggleButton className='rounded-lg' sx={{color: 'grey'}} value="basic">Basic Plans</ToggleButton>
                  <ToggleButton className='rounded-lg' sx={{color: 'grey'}} value="other">Other Plans</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="mt-8 overflow-x-scroll slider cursor-grab">
                <div className="w-full flex flex-row gap-4 slider-child">
                {programs.filter(plan => {
                    return (plan.show && ((plan.basic && type=="basic")||(!plan.basic && type=="other")))
                }).map(plan => {
                    return <>
                        {/* Pricing Card */}
                        <div className={`${plan.badge? 'relative' : ''} plan overflow-hidden flex-shrink-0 flex flex-col p-6 mx-auto w-80 text-center rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-4 dark:bg-gray-800 dark:text-white`}>
                            {plan.badge.length? <p className={`absolute ${ plan.badge == "Top-seller" ? 'bg-green-500' : 'bg-yellow-500'} -rotate-45 px-16 -left-16 top-8`}>{plan.badge}</p> : <></>}
                            
                            <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400 mt-5 min-h-24">{plan.description}</p>
                            <div className="flex justify-center items-baseline my-4">
                                <span className="mr-2 text-5xl font-extrabold ">£ {plan.cost}</span>
                                <span className="text-gray-500 dark:text-gray-400">/{plan.duration} {plan.period}</span>
                            </div>
                            {/* List */}
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                {plan.features.map(feature => {
                                    return <>
                                        <li className="flex items-center space-x-3">
                                            {/* Icon */}
                                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                            <span>{feature}</span>
                                        </li>
                                    </>
                                })}
                            </ul>
                            <a href="#contact" className="mt-auto text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-green-900">Get started</a>
                        </div>
                    </>
                })}
                </div>
            </div>
        </div>
    </section>
}