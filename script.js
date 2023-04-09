//creating variables 
const btnEl = document.getElementById("btn");

const appEl = document.getElementById("app");

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content)
    appEl.insertBefore(noteEl, btnEl);
})

//creating functions
function createNoteEl(id, content) {
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.placeholder = "Empty Note"

    //styling note box
    element.value = content
    element.style.resize = "none"
    element.style.height = "30vh"
    element.style.padding = "10px"
    element.style.outline = "0px"



    //eventlistener for double click deletion
    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want ro delete thid note?")
        //condition
        if (warning) {
            deleteNote(id, element)

        }
    })

    //eventlistener for new data input
    element.addEventListener("input", () => {
        updateNote(id, element.value)
    });

    return element;
}

//function for deleting note

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id)
    saveNote(notes)
    appEl.removeChild(element);


}

//function for updating note
function updateNote(id, content) {
    const notes = getNotes()
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);


}




function addNote() {

    const notes = getNotes();

    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);
    notes.push(noteObj);

    saveNote(notes)

}

function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}


//creating event listener
btnEl.addEventListener("click", addNote)




