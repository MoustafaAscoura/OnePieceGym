import Image from 'next/image'

export default function Footer () {
    return <footer class="bg-slate-950">
            <div class="mx-auto w-full max-w-screen-xl p-4">
                <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <h2 className="text-center text-lg font-semibold leading-8">
                            Certified Coaches From Top Institutions In The Game
                            </h2>
                            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">

                                <Image
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                    src="/assets/images/H2O.png"
                                    alt="Reform"
                                    width={158}
                                    height={48}
                                />
                                <Image
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                    src="/assets/images/ACE.png"
                                    alt="Tuple"
                                    width={158}
                                    height={48}
                                />
                                                        <Image
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                    src="/assets/images/NASM.png"
                                    alt="Transistor"
                                    width={158}
                                    height={48}
                                />
                                <Image
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                    src="/assets/images/H2O.png"
                                    alt="Reform"
                                    width={158}
                                    height={48}
                                />
                            </div>
                        </div>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
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
                    <div class="md:flex flex-wrap justify-end gap-16">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Location</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <p>Roof Floor, Dahmash Mall. Hehia, Sharkia.</p>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d428.9486489324967!2d31.588982806262777!3d30.673694592668735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7f5498f88edcf%3A0x246af4e98a56b7e1!2z2YXZiNmEINin2KjZiCDYr9mH2YXYtA!5e0!3m2!1sen!2seg!4v1703483035879!5m2!1sen!2seg" className="border-0 w-100 h-50" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </li>
                            </ul>
                        </div>
                        <div className='max-w-xs my-16 md:my-0 '>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li >
                                    <a href="https://www.facebook.com/profile.php?id=100091909050335" class="hover:underline ">Facebook</a>
                                </li>
                                <li class="my-4">
                                    <a href="https://www.instagram.com/1_piece_gym/" class="hover:underline">Instagram</a>
                                </li>
                                <li>
                                    <a href="https://wa.me/01155539381" class="hover:underline">Whatsapp</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Working Hours</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <p>Ladies: Sat, Mon, Wed: From 5 to 7 PM</p>
                                </li>
                                <li>
                                    <p>Gentlemen: Daily Except Friday: <br/>Morning shift: 9 AM to 4 PM<br/>Evening shift: 7 PM to 11 PM</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
}