import './Contact.css'

export default function Contact () {
    return <section style={{minHeight:'100vh'}} id="contact" className="row row-cols-1 row-cols-lg-2 w-100 p-lg-5 p-2 py-5">
        <div className='col d-flex justify-content-center align-items-center pb-3 pt-5'>
            <img src='/assets/images/Contact.jpg' alt="" />
        </div>
        <div className='col d-flex flex-column justify-content-center px-3 px-lg-5'>
            <h3 className='section-header'><span className='border border-success line'></span>Contact Us</h3>
            <h1> <span className='text-success'>JOIN US</span> NOW!</h1>
            <p style={{fontSize:'max(15px, 3vmin)'}}>
            Send us a message and we will get back to you with all the details. 
            Make sure to make clear inquiries for better communication. 
            Looking forward to seeing you at our gym!
            </p>
            <form>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" />
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input type="text" class="form-control" id="phone"/>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea class="form-control" id="message" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>

    </section>
}