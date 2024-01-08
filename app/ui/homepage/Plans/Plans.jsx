import './Plans.css'

export default function Plans () {
    return <section id="plans" className="bg-dark text-center py-2 py-lg-5">
        <div className='container'>
            <h3 className='section-header my-3'><span className='border border-success line'></span>Our Pricing</h3>
            <h1 className='fw-bold'>PLANS <span className='text-success'>& OFFERS</span></h1>
            <div className="d-flex justify-content-between mt-5 mt-lg-5 slider">
                <div className='plan'>
                    <p className='period'>Billed Monthly</p>
                    <h1 className='price'>350<span className='fs-4 ms-2'>LE</span></h1>
                    <h3>Beginners</h3>
                    <div className='divider'></div>
                    <p className='description'>Become a Member with only 350LE per month. You will get amazing packages nd give it a shot!</p>
                    <a href="#contact" className='btn btn-outline-success'>Join Now</a>
                </div>
                <div className='plan mx-5'>
                    <p className='period'>Billed per Quarter</p>
                    <h1 className='price'>1000<span className='fs-4 ms-2'>LE</span></h1>
                    <h3>Basic</h3>
                    <div className='divider'></div>
                    <p className='description'>Join the Basic Package, and get a fair discount. Always ask for new offers!</p>
                    <a href="#contact" className='btn btn-outline-success'>Join Now</a>
                </div>
                <div className='plan'>
                    <p className='period'>Billed Annually</p>
                    <h1 className='price'>3500<span className='fs-4 ms-2'>LE</span></h1>
                    <h3>Advanced</h3>
                    <div className='divider'></div>
                    <p className='description'>You are our premium member. You get all a fair discount and offers.</p>
                    <a href="#contact" className='btn btn-outline-success'>Join Now</a>
                </div>
            </div>
        </div>
    </section>
}