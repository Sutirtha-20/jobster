import React from 'react'
import logo1 from '../assets/images/main.svg'
import styled from 'styled-components';
import { Logo } from '../components/index';
import { Link } from 'react-router-dom';

// Use of Styled Components we can use file specific CSS and access them in this
// Section no need to go fr index.css for this purpose
const Wrapper = styled.main`
    nav{
        width: var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }
    .page{
      min-height: calc(100vh - var(--nav-height));
      display: grid;
      align-items: center;
    }
    h1{
        font-weight: 700;
        span{
            color: var(--primary-500);
        }
    }
    p{
        color: var(--grey-600);
    }
    .main-img{
        display: none;
    }
    @media (min-width: 992px){
        .page{
            grid-template-columns: 1fr 1fr;
            column-gap: 3rem;
        }
        .main-img{
            display: block;
        }
    }
`;

function Landing() {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            {/* info */}
            <div className="info">

                <h1>Job <span>Tracking</span> App</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita distinctio commodi hic itaque velit id blanditiis non iure amet? Ab.</p>
                <Link to='/register' className='btn btn-hero'>
                    Login / Register
                </Link>
            </div>
            <img src={logo1} alt="job hunt" className='img main-img'/>
            
        </div>
    </Wrapper>
  )
}

export default Landing