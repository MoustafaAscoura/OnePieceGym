import './Hero.css'
import { Button } from '@mui/material'

export default function Hero () {
    return <>
    <section className="hero" id="home">
        <div>
            <h1>READY TO TRAIN<span className='text-success block'>YOUR BODY</span></h1>
            <p>Gym training is a structured and disciplined approach to physical exercise that focuses on strength, endurance and overall fitness improvement.</p>
            <Button component="a" href="#contact" variant='outlined' color="success" className='text-3xl font-semibold px-20 py-6 rounded-0 mt-5'>Join Now</Button>
        </div>
    </section>
    </>
}