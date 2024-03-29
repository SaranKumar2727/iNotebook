import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials,setCredentials]=useState({email:"",password:""})
  
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password: credentials.password}),

    });
    const json=await response.json();
    console.log(json);
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      navigate("/")
    }
    else{
      alert("Invalid Credentials")
    }

  }
  const onChange=(e)=>{
        
    setCredentials({...credentials,[e.target.name]:e.target.value})
};
  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email"  onChange={onChange} value={credentials.email} name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password}  id="password" placeholder="Password"/>
        </div>
        
        <button type="submit" className="btn btn-warning my-3" >Submit</button>
      </form>
    </div>
  )
}

export default Login
