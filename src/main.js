import "../style.css";
import "./script/index.js";
import "./data/notes.js";
import { getNotes, addNote, deleteNote } from "./data/notes.js";

function displayNotes() {
  const noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  const notes = getNotes();
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note-item");
    noteElement.setAttribute("data-note-id", note.id);

    const body = note.body ? note.body : "";
    const description = note.description ? note.description : "";

    noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${body ? body + " " : ""}${description}</p>
            <button class="delete-button">Delete</button>
        `;
    noteList.appendChild(noteElement);
  });
}

document
  .getElementById("formNote")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (title && description) {
      const newNote = {
        id: `note-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        description: description,
      };
      addNote(newNote);
      displayNotes();
      document.getElementById("formNote").reset();
    } else {
      alert("Judul dan catatan tidak boleh kosong!");
    }
  });

displayNotes();

document.getElementById("noteList").addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    const noteId = event.target.parentElement.getAttribute("data-note-id");
    deleteNote(noteId);
    displayNotes();
  }
});
