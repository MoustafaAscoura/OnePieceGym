export default function Coaches () {
    return <section id="coaches" className="bg-gray-900 text-center py-2 lg:py-5 ">
        <div className='w-full max-w-7xl mx-auto my-16 px-8'>
            <h3 className='section-header flex justify-center items-center text-2xl my-5'><span className='border-2 border-green-600 me-4 w-24'></span>Meet Us</h3>
            <h1 className='font-bold text-2xl lg:text-5xl'>OUR <span className='text-green-600'>TEAM</span></h1>
            
            <div className="w-full flex flex-row overflow-x-scroll slider mt-8">
                <div className='flex-shrink-0'>
                    <img src='/assets/images/Ayman.jpg' alt="Ayman" />
                    <h4 className='w-full caption'>Cap. Ayman</h4>
                </div>
                <div className='flex-shrink-0 mx-5'>
                    <img src='/assets/images/Badr.jpg' alt="Badr" />
                    <h4 className='w-full caption'>Cap. Badr</h4>
                </div>
                <div className='flex-shrink-0'>
                    <img src='/assets/images/Mostafa.jpg' alt="Mostafa" />
                    <h4 className='w-full caption'>Cap. Mostafa</h4>
                </div>
            </div>
        </div>
    </section>
}