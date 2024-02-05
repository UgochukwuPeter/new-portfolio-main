import './service.css';

const Service = (props) => {
  return (
    <div className='service'>
        <span>{props.icon}</span>
        <h1>{props.title}</h1>
        <p>{props.desc}</p>
    </div>
  )
}

export default Service