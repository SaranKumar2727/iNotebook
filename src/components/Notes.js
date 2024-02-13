import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;

    useEffect(() => {
        getNotes();
    }, []);
    const [note,setNote]=useState({id:"",etitle: "", edesc : "",etag: "default"})

    const ref = useRef(null);
    const refClose=useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    };

    

    const handleClick=(e)=>{
        // console.log("updating a note....",note);
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        
    };

    const onChange=(e)=>{
        
        setNote({...note,[e.target.name]:e.target.value})
    };
    return (
        <>
            <AddNote />
            <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="etitle" minLength={5} required value={note.etitle} name='etitle'  onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">description</label>
                            <input type="text" className="form-control" minLength={5} required id="edescription" value={note.edescription} name='edescription' onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Tag</label>
                            <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                {notes.length===0 && 'No Notes to display'}
                </div>
                {notes.map((note) => (
                    <Noteitem note={note} updateNote={updateNote} key={note._id} />
                ))}
            </div>
        </>
    );
};

export default Notes;
