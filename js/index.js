// Features:
// 1. text dropdown and blod, italicize, underline
// 2. New note
// 3. Delete note
// 4. Copy all text

//Other feature:
// List and grid view

//New note:
//grabbing the sideview elements:

const noteTitle = document.getElementsByClassName("note-title");
const noteBody = document.getElementsByClassName("note-body");
const noteDate = document.getElementsByClassName("note-date");

//grabbing the list where all notes are saved

const notesList = document.querySelector(".notes-list");

//making an empty array to store notes list

let notesArray = []
let activeNote
let newCreated = true

// selecting the "new-note" icon

const addNewNote = document.getElementById("new-note");


// pushing new notes to the notesArray list

addNewNote.addEventListener("click", ()=>{
    let
})

//grabbing the text put in by the user and displaying it in the side-view
