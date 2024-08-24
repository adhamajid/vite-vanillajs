import "./style/style.css";
import { Loading } from "./script/loading.js"; // Import LoadingSpinner
import "./script/index.js";
import Swal from "sweetalert2";

// Create an instance of LoadingSpinner
const loadingSpinner = new Loading();

const baseUrl = "https://notes-api.dicoding.dev/v2";

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

// Fungsi untuk mendapatkan catatan dari API
const getNotes = () => {
  loadingSpinner.show(); // Show loading spinner
  return fetch(`${baseUrl}/notes`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        return responseJson.data;
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    })
    .finally(() => {
      loadingSpinner.hide(); // Hide loading spinner
    });
};

// Fungsi untuk menambahkan catatan
const addNote = (note) => {
  loadingSpinner.show(); // Show loading spinner
  fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "12345",
    },
    body: JSON.stringify({ title: note.title, body: note.body }),
  })
    .then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Notes has been added",
        showConfirmButton: false,
        timer: 1500,
      });
      getNotes().then(renderNotes);
    })
    .catch((error) => {
      showResponseMessage(error);
    })
    .finally(() => {
      loadingSpinner.hide(); // Hide loading spinner
    });
};

// Fungsi untuk menghapus catatan
const deleteNote = (noteId) => {
  loadingSpinner.show(); // Show loading spinner
  fetch(`${baseUrl}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": "12345",
    },
  })
    .then(() => {
      Swal.fire({
        title: "Deleted!",
        text: "Your note has been deleted.",
        icon: "success",
      });
      getNotes().then(renderNotes);
    })
    .catch((error) => {
      showResponseMessage(error);
    })
    .finally(() => {
      loadingSpinner.hide(); // Hide loading spinner
    });
};

// Fungsi untuk menampilkan catatan
const renderNotes = (notes) => {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    const noteCard = createNoteCard(note);
    notesContainer.appendChild(noteCard);
  });
};

// Event listener untuk menambah catatan
document
  .getElementById("add-note-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("note-title").value.trim();
    const content = document.getElementById("note-content").value.trim();
    if (title && content) {
      const newNote = {
        title: title,
        body: content,
      };
      addNote(newNote);
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
    }
  });

// Menampilkan pesan kesalahan
const showResponseMessage = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

// Menampilkan catatan saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", () => {
  getNotes().then(renderNotes);
});
