import './Programs.css'

export default function Programs () {
    return <section id="programs" className="bg-slate-950 text-center py-2 lg:py-5 ">
        <div className='w-full max-w-7xl mx-auto my-16 px-8'>
            <h3 className='section-header flex justify-center items-center text-2xl my-5'><span className='border-2 border-green-600 me-4 w-24'></span>What We Do</h3>
            <h1 className='font-bold text-2xl lg:text-5xl'>OUR <span className='text-green-600'>PROGRAMS</span></h1>
            
            <div className="w-full flex flex-row overflow-x-scroll slider mt-8">
                <div className='flex-shrink-0'>
                    <img src='/assets/images/Program1.jpg' alt="Martial Arts" />
                    <h4 className='w-full caption'>Martial Arts Training</h4>
                </div>
                <div className='flex-shrink-0 mx-5'>
                    <img src='/assets/images/Program2.jpg' alt="" />
                    <h4 className='w-full caption'>Rehabilitation</h4>
                </div>
                <div className='flex-shrink-0'>
                    <img src='/assets/images/Program3.jpg' alt="" />
                    <h4 className='w-full caption'>Strength Excercises</h4>
                </div>
            </div>
        </div>
    </section>
}