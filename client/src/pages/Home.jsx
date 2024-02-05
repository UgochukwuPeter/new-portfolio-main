import React from 'react'
import Header from '../components/Header'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <Services/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home