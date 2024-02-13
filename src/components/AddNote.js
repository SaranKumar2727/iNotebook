import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context=useContext(noteContext);
    const {addNote}=context;
   
    const [note,setNote]=useState({title: "", desc : "",tag: ""})
    const handleClick = (e) => {
        e.preventDefault();
    
        console.log("Note:", note);
         addNote(note.title, note.description, note.tag);
        setNote({title:"", description :"",tag:""});
        
    };
    const onChange=(e)=>{
        
        setNote({...note,[e.target.name]:e.target.value})
    };

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" minLength={5}  value={note.title} required  name='title'  onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="description">description</label>
                <input type="text" className="form-control" id="description" value={note.description} minLength={5} required  name='description' onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="description">Tag</label>
                <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange}/>
            </div>
            
            <button type="submit"  className="btn btn-primary my-3" onClick={handleClick}>Submit</button>
            </form>
        </div>
  )
}

export default AddNote
