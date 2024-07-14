class NoteApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
          <h1 class="title">NoteApp</h1>
      </header>
      <div class="container mt-5">
          <div class="row">
              <div class="col-md-8 offset-md-2">
                  <div class="card">
                      <div class="card-header">
                          Add Note
                      </div>
                      <div class="card-body">
                          <form id="add-note-form">
                              <div class="form-group">
                                  <label for="note-title">Title</label>
                                  <input type="text" id="note-title" class="form-control" required>
                              </div>
                              <div class="form-group">
                                  <label for="note-content">Content</label>
                                  <textarea id="note-content" class="form-control" rows="3" required></textarea>
                              </div>
                              <button type="submit" class="btn btn-primary">Add</button>
                          </form>
                      </div>
                  </div>
                  <div id="notes-container" class="mt-3">
                      <!-- Daftar catatan akan ditampilkan di sini -->
                  </div>
              </div>
          </div>
      </div>
    `;
  }
}

customElements.define("note-app", NoteApp);
