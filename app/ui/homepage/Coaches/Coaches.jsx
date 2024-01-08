export default function Coaches () {
    return <section id="coaches" className="text-center py-2 py-lg-5">
        <div className='container'>
            <h3 className='section-header my-3'><span className='border border-success line'></span>Meet Us</h3>
            <h1 className='fw-bold'>OUR <span className='text-success'>Coaches</span></h1>
            <div className="d-flex justify-content-between mt-5 mt-lg-5 slider">
                <div>
                    <img src='/assets/images/Ayman.jpg' alt="Martial Arts" />
                    <h4 className='text-light w-100 caption'>Cap. Ayman</h4>
                </div>
                <div className='mx-5'>
                    <img src='/assets/images/Badr.jpg' alt="" />
                    <h4 className='text-light w-100 caption'>Cap. Badr</h4>
                </div>
                <div>
                    <img src='/assets/images/Mostafa.jpg' alt="" />
                    <h4 className='text-light w-100 caption'>Cap. Mostafa</h4>
                </div>
            </div>
        </div>
    </section>
}