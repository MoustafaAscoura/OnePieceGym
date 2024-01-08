import './Programs.css'

export default function Programs () {
    return <section id="programs" className="bg-dark text-center py-2 py-lg-5">
        <div className='container'>
            <h3 className='section-header my-3'><span className='border border-success line'></span>What We Do</h3>
            <h1 className='fw-bold'>OUR <span className='text-success'>PROGRAMS</span></h1>
            <div className="d-flex justify-content-between mt-5 mt-lg-5 slider">
                <div>
                    <img src='/assets/images/Program1.jpg' alt="Martial Arts" />
                    <h4 className='text-light w-100 caption'>Martial Arts Training</h4>
                </div>
                <div className='mx-5'>
                    <img src='/assets/images/Program2.jpg' alt="" />
                    <h4 className='text-light w-100 caption'>Rehabilitation</h4>
                </div>
                <div>
                    <img src='/assets/images/Program3.jpg' alt="" />
                    <h4 className='text-light w-100 caption'>Strength Excercises</h4>
                </div>
            </div>
        </div>
    </section>
}