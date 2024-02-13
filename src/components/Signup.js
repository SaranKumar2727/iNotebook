import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),

    });
    const json=await response.json();
    console.log(json)
      //save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      navigate("/")
  }
  const onChange=(e)=>{
        
    setCredentials({...credentials,[e.target.name]:e.target.value})
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group x">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange}  />
        </div>
        <div className="form-group x">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password'  required minLength={5} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' required minLength={5} onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-warning">Submit</button>
      </form>
    </div>
  )
}

export default Signup
