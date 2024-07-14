class NoteApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header>
            <h1 class="title">NoteApp</h1>
        </header>
        <div class="container">
            <note-card></note-card>
            <div class="card">
                <div id="noteList"></div>
            </div>
        </div>
      `;
  }
}

customElements.define("note-app", NoteApp);
