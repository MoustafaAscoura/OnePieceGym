'use client'

import './Plans.css'
import {useState} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const programs = {
    'basic' : [{
        'name': 'Starter',
        'price': 450,
        'duration': 'Month',
        'description': 'Become a Member with only 450LE per month. You will get amazing packages!',
        'features': ['2 Invitations', 'Nutrition Plan', 'Inbody', '1 Private Session']
    },{
        'name': 'Basic',
        'price': 1000,
        'duration': '3 Months',
        'description': 'Join the Basic Package, and get a fair discount. Always ask for new offers!',
        'features': ['4 Invitations', '2 Nutrition Plans', '3 Inbody', '2 Private Session', '2 Weeks Freezing'],
        'badge': 'Top-seller'
    },{
        'name': 'Advanced',
        'price': 1800,
        'duration': '6 Months',
        'description': 'You are our premium member. You get all a fair discount and offers.',
        'features': ['6 Invitations', '4 Weekly Invitations', '3 Nutrition Plans', '6 Inbody', '4 Private Session']
    },{
        'name': 'Royal',
        'price': 2800,
        'duration': 'Year',
        'description': 'Become a Member with only 450LE per month. You will get amazing packages!',
        'features': ['10 Invitations', '8 Weeks Freezing', '4 Nutrition Plans', '10 Inbody', '10 Private Sessions'],
        'badge': 'Best-value'
    }], 
    
    'other' : [
    {
        'name': 'Zumba',
        'price': 450,
        'duration': 'Month',
        'description': 'Lets do the ZUMBA dance!',
        'features': ['2 Invitations', 'Nutrition Plan', 'Inbody'],
    },{
        'name': 'Rehab',
        'price': 1000,
        'duration': 'Month',
        'description': '1 Month injury rehab with the best techniques and up-to-date knowledge',
        'features': ['2 Invitations', 'Private Sessions', '2 Inbody', 'Specialized Programs', 'Essential Nutrition Plan'],
        'badge': 'Top-seller'
    },{
        'name': 'Conditioning',
        'price': 500,
        'duration': 'Month',
        'description': 'Prepare your body for competitions and unlock your full potential.',
        'features': ['2 Invitations', 'Specialized Programs', 'Nutrition Plan', 'Inbody', 'Private Sessions']
    },{
        'name': 'Kickboxing',
        'price': 450,
        'duration': '1 Month',
        'description': 'Become a Member with only 450LE per month. You will get amazing packages!',
        'features': ['2 Invitations', 'Nutrition Plan', 'Inbody', 'Private Sessions'],
    }]}

export default function Plans () {
    const [type, setType] = useState("basic")
    const handleChange = (event, newType) => {
      setType(newType || type);
    };

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
            <div className="w-full flex flex-row overflow-x-scroll slider mt-8 gap-4">
                {programs[type].map(plan => {
                    return <>
                        {/* Pricing Card */}
                        <div className={`${plan.badge? 'relative' : ''} overflow-hidden flex-shrink-0 flex flex-col p-6 mx-auto w-80 text-center rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-4 dark:bg-gray-800 dark:text-white`}>
                            {plan.badge? <p className={`absolute ${ plan.badge == "Top-seller" ? 'bg-green-500' : 'bg-yellow-500'} -rotate-45 px-16 -left-16 top-8`}>{plan.badge}</p> : <></>}
                            
                            <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400 mt-5 min-h-24">{plan.description}</p>
                            <div className="flex justify-center items-baseline my-4">
                                <span className="mr-2 text-5xl font-extrabold ">£ {plan.price}</span>
                                <span className="text-gray-500 dark:text-gray-400">/{plan.duration}</span>
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
    </section>
}