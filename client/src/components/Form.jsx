import { useState, useRef} from 'react';
import emailjs from '@emailjs/browser';
import './form.css';

const Form = () => {
    const form = useRef();
    const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    subject: '',
    email: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!subject) {
      newErrors.subject = 'Subject is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // submit the form
    //   console.log('Form submitted:', { name, subject, email, message});
      emailjs.sendForm('service_fqsarxb', 'template_b2k9udj', form.current, '2tWJg6cKwwl9oXjZQ')
      .then((result) => {
          console.log(result.text);
          form.current.reset();
          setStatusMessage("Email sent successfully");
      }, (error) => {
          console.log(error.text);
      });
    }
  };

  return (
    <div className='form-container'>
    <p className='form-success'>{statusMessage}</p>
      <form onSubmit={handleSubmit} ref={form}>
        <input type='text' name='user_name' placeholder='Name'  onChange={(e) => setName(e.target.value)} />
        {errors.name && <span className='error'>{errors.name}</span>}
        <input type='text' name='user_subject' placeholder='Subject'  onChange={(e) => setSubject(e.target.value)}/>
        {errors.subject && <span className='error'>{errors.subject}</span>}
        <input type='email' name='user_email' placeholder='Email'  onChange={(e) => setEmail(e.target.value)}/>
        {errors.email && <span className='error'>{errors.email}</span>}
        <textarea name='message' rows='7'  cols='70' onChange={(e) => setMessage(e.target.value)} placeholder='Message'></textarea>
        <button type='submit' value="Send">Submit</button>
      </form>
    </div>
  );
};

export default Form;

