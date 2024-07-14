import "../style.css";
import "./script/index.js";
import "./data/notes.js";
import { getNotes, addNote, deleteNote } from "./data/notes.js";

// Fungsi untuk membuat elemen catatan
function createNoteCard(note) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = note.title;
  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = note.body || note.description;
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "delete-button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("data-note-id", note.id);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(deleteButton);
  card.appendChild(cardBody);
  return card;
}

// Fungsi untuk menampilkan catatan
function displayNotes() {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";
  const notes = getNotes();
  notes.forEach((note) => {
    const noteCard = createNoteCard(note);
    notesContainer.appendChild(noteCard);
  });
}

// Event listener untuk menambah catatan
document
  .getElementById("add-note-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("note-title").value.trim();
    const content = document.getElementById("note-content").value.trim();
    if (title && content) {
      const newNote = {
        id: `notes-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        body: content,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      addNote(newNote);
      displayNotes();
      document.getElementById("add-note-form").reset();
    } else {
      alert("Judul dan konten tidak boleh kosong!");
    }
  });

// Event listener untuk menghapus catatan
document
  .getElementById("notes-container")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const noteId = event.target.getAttribute("data-note-id");
      deleteNote(noteId);
      displayNotes();
    }
  });

// Menampilkan catatan saat halaman pertama kali dimuat
displayNotes();
