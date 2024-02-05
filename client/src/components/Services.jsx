import Service from './Service'
import './services.css'

const Services = () => {
  return (
    <div className='services' id='services'>
        <h1>What do I offer</h1>
        <p>Elevating your projects with my comprehensive skills in Node.js, React.js, and web development, delivering unparalleled expertise and creativity for outstanding results.</p>
        <div className='service-wrapper'>
            <Service icon={<i class='bx bx-desktop'></i>} title="Web Development" desc="Specializing in full-stack development for dynamic and responsive websites. I create interactive, visually appealing interfaces, ensuring a seamless user journey." />
            <Service icon={<i class='bx bx-code'></i>} title="Node.js Development" desc="Harness the power of Node.js for robust server-side applications. I deliver cutting-edge solutions tailored to your needs, from APIs to scalable network applications." />
            <Service icon={<i class='bx bx-cog' ></i>} title="Code Optimization" desc="Improve efficiency and speed with code optimization services. Enhance performance and reduce load times for smoother application experiences."/>
        </div>
    </div>
  )
}

export default Services