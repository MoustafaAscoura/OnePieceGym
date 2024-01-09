import './Hero.css'
import { Button } from '@mui/material'

const stats = [
  { name: 'Specialized Programs', value: '6+' },
  { name: 'Skilled Coaches', value: '10+' },
  { name: 'Calories Burnt', value: 'Unlimited' },
]


export default function Hero() {
  return (
    <section className="hero" id="home">
        {/* <div>
            <Button component="a" href="#contact" variant='outlined' color="success" className='text-3xl font-semibold px-20 py-6 rounded-0 mt-5'>Join Now</Button>
        </div> */}

      <div className="px-6 pt-6 sm:pt-6 lg:px-8">
        <div className="mx-auto sm:max-w-2xl lg:max-w-5xl py-32 sm:py-24 lg:py-56">
          <div className="text-center">
            <h1 className="font-bold lg:text-8xl text-4xl">
              READY TO TRAIN<span className='text-green-600 block'>YOUR BODY</span>
              </h1>
            <p className="mt-6 text-lg leading-6 sm:text-md">
            Gym training is a structured and disciplined approach to physical 
            exercise that focuses on strength, endurance and overall fitness improvement.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 text-center">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#contact"
                className="rounded-md bg-green-600 px-7 py-2 lg:py-4 text-md lg:text-2xl  font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Get started
              </a>
              <a href="#services" className="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
        </div>
      </div>
    </section>
  )
}