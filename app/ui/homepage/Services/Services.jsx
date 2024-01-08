import './Services.css'


export default function Services () {
    return <section id="services" className="row row-cols-1 row-cols-lg-2 w-100 p-lg-5 p-2">
        <div className='col d-flex justify-content-center align-items-center pb-3 pt-5'>
            <img src='/assets/images/Services.jpg' alt="" />
        </div>
        
        <div className='col d-flex flex-column justify-content-center px-3 px-lg-5'>
            <h3 className='section-header'><span className='border border-success line'></span>What We Offer</h3>
            <h1>We Provide Training and <span className='text-success'>Best Fitness Motivation</span></h1>
            <p style={{fontSize:'max(15px, 3vmin)'}}>An excellent atmosphere for training. We value physical
                and psychological health. Engange in a vital community of activity and wellbeing.
            </p>
            <ul style={{listStyle:'none', fontSize:'min(3vmin, 30px)', fontWeight:'200'}} className='p-0 mt-lg-4'>
                <li>Over 10 years of combined experience</li>
                <li className=' my-2 my-lg-3'>Tailored Programs for each trainee</li>
                <li>Top notch techniques and equipment</li>
            </ul>
        </div>

    </section>
}