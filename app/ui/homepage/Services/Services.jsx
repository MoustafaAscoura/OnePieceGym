import './Services.css'

export default function Services () {
    return <section className="bg-gray-900 flex items-center" id="services">
        <div className="gap-8 items-center my-auto py-8 px-8 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-16">
            <img className="w-full mx-auto" src='/assets/images/Services.jpg' alt="dashboard image"/>
            <div className="mt-4 md:mt-0">
                <h3 className='section-header flex items-center text-2xl my-5'><span className='border-2 border-green-600 me-4 w-24'></span>What We Offer</h3>

                <h2 className="mb-4 text-2xl md:text-5xl  tracking-tight font-extrabold text-gray-900 dark:text-white">
                We Provide Training and <span className='text-green-600'>Best Fitness Motivation</span>
                </h2>
                <p className="mb-6 font-light text-gray-300 md:text-lg">
                An excellent atmosphere for training. We value physical
                    and psychological health. Engange in a vital community of activity and wellbeing.
                </p>
                <a href="#contact" className="inline-flex items-center text-green-500 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                    Send us a message
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    </section>
}