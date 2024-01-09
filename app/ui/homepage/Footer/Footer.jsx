import './Footer.css'

export default function Footer () {
    return <footer class="bg-slate-950">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0">
                        <h1 className="relative text-6xl">
                            ONE<span className="text-green-600">PIECE</span>
                            <span
                            style={{ left: "1%" }}
                            className="absolute font-semibold text-red-600"
                            >
                            X
                            </span>
                        </h1>
                    </div>
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <a href="https://flowbite.com/" class="hover:underline">Flowbite</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                    Trusted by the world’s most innovative teams
                    </h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                            alt="Transistor"
                            width={158}
                            height={48}
                        />
                        <img
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                            alt="Reform"
                            width={158}
                            height={48}
                        />
                        <img
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                            alt="Tuple"
                            width={158}
                            height={48}
                        />
                        <img
                            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                            alt="SavvyCal"
                            width={158}
                            height={48}
                        />
                        <img
                            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                    </div>
                </div>
            </div>
            </div>
            <div class="container">
                <div class="row py-5 w-100">
                    <div class="col-12 col-lg-2 d-flex flex-column">
                        <h1 style={{fontSize:'64px'}} className="text-light m-0 position-relative">ONE<span className="text-success">PIECE</span><span className="logox">X</span></h1>
                    </div>
                    <div class="col-12 col-lg-3 offset-0 offset-lg-1">
                        <h4 className='mb-3'>Location</h4>
                        <p>Roof Floor, Dahmash Mall. Hehia, Sharkia.</p>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d428.9486489324967!2d31.588982806262777!3d30.673694592668735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7f5498f88edcf%3A0x246af4e98a56b7e1!2z2YXZiNmEINin2KjZiCDYr9mH2YXYtA!5e0!3m2!1sen!2seg!4v1703483035879!5m2!1sen!2seg" className="border-0 w-100 h-50" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div class="col-6 offset-0 col-lg-2 offset-lg-1">
                        <h4>Contact Us</h4>
                        <a className='text-decoration-none text-light mt-3' href="https://www.facebook.com/profile.php?id=100091909050335" rel='noreferrer' target='_blank'><p>Facebook Page</p></a>
                        <a className="text-decoration-none text-light my-2" href="https://www.instagram.com/deebo_98/" target='_blank' rel='noreferrer'><p> Instagram Account</p></a>
                        <p>01155539381</p>
                    </div>
                    <div class="col-6 offset-0 col-lg-2 offset-lg-1">
                        <h4>Working Hours</h4>
                        <p>Ladies</p>
                        <p className='fw-light'>Sat, Mon, Wed: From 5 to 7 PM</p>
                        <p>Gentlemen</p>
                        <p className='fw-light'>Daily Except Friday: <br/>Morning shift: 9 AM to 4 PM<br/>Evening shift: 7 PM to 11 PM</p>
                    </div>
                </div>
            </div>
        </footer>
}