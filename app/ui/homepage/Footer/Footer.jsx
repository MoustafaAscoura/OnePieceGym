import './Footer.css'

export default function Footer () {
    return <footer className='bg-dark'>
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