import React from 'react'
import logo from '../assets/images/logo.svg'
import logo1 from '../assets/images/main.svg'

function Landing() {
  return (
    <main>
        <nav>
            <img src={logo} alt="jobster logo" className='logo' />

        </nav>
        <div className="container page">
            {/* info */}
            <div className="info">

                <h1>Job <span>Tracking</span> App</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita distinctio commodi hic itaque velit id blanditiis non iure amet? Ab.</p>
                <button className="btn btn-hero">Login/Register</button>
            </div>
            <img src={logo1} alt="job hunt" className='img main-img'/>
            
        </div>
    </main>
  )
}

export default Landing