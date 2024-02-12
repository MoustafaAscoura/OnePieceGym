import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@/app/ui/home.css'

import Navbar from '@/app/ui/homepage/Navbar/Navbar';
import Hero from '@/app/ui/homepage/Hero/Hero';
import Services from '@/app/ui/homepage/Services/Services';
import Programs from '@/app/ui/homepage/Programs/Programs';
import Coaches from '@/app/ui/homepage/Coaches/Coaches';
import Plans from '@/app/ui/homepage/Plans/Plans';
import Contact from '@/app/ui/homepage/Contact/Contact';
import Footer from '@/app/ui/homepage/Footer/Footer';
import Video from './ui/homepage/Video/Video';
import Testimonial from './ui/homepage/Testimonial/Testimonial';

export default function Homepage () {
    return <>
        <Navbar/>
        <Hero/>
        <Services/>
        <Video/>
        <Programs/>
        <Coaches/>
        <Plans/>
        <Testimonial />
        <Contact/>
        <Footer/>
    </>
} 