import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState =(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial)
    //Get all notes
    const getNotes=async()=>{
      //TODO: API-CALL
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMTg0NTc2NWNkNDdhYzNlYmU4ZTM3In0sImlhdCI6MTcwNTEzNTMyM30.blV9FxgMTOcipHpLfq2RnShp4MloTJmmig0-gv_HxEM"
        } 
      });
      const json=await response.json()
      // console.log(json);
      setNotes(json)
    }




    // Add a note
    const addNote=async(title,description,tag)=>{
      //TODO: API-CALL
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMTg0NTc2NWNkNDdhYzNlYmU4ZTM3In0sImlhdCI6MTcwNTEzNTMyM30.blV9FxgMTOcipHpLfq2RnShp4MloTJmmig0-gv_HxEM"
        },
        body: JSON.stringify({title,description,tag}),
      });
      const note= await response.json();
    
      setNotes(notes.concat(note));
    }
    // Delete a note
    const deleteNote=async(id)=>{
      //API CALL
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMTg0NTc2NWNkNDdhYzNlYmU4ZTM3In0sImlhdCI6MTcwNTEzNTMyM30.blV9FxgMTOcipHpLfq2RnShp4MloTJmmig0-gv_HxEM"
        },
        
      });
      const json=response.json();
      // console.log(json)
      // console.log("deleting a node of id: "+id); 
      const newNotes=notes.filter((note)=>{
        return note._id!==id
      })
      setNotes(newNotes);
    }
    // Edit a note
    const editNote=async(id,title,description,tag)=>{
      //API CALL
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMTg0NTc2NWNkNDdhYzNlYmU4ZTM3In0sImlhdCI6MTcwNTEzNTMyM30.blV9FxgMTOcipHpLfq2RnShp4MloTJmmig0-gv_HxEM"
        },
        body: JSON.stringify({title,description,tag})
      });
      const json=await response.json();
    
      // console.log(json)
      //logic to edit inclient 

      let NewNotes=JSON.parse(JSON.stringify(notes))
      for(let index=0;index<notes.length;index++){
        const element=notes[index];
        if(element._id===id){
          NewNotes[index].title=title;
          NewNotes[index].description=description;
          NewNotes[index].tag=tag;
          break;
        }
        
      }
      setNotes(NewNotes)
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
    }

export default NoteState;