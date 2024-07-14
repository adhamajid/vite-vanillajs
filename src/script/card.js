class NoteCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `      
        <div class="item-card">
            <div class="input-card">
                <form id="formNote">
                    <label for="title">Judul :</label>
                    <input type="text" id="title" required/>
                    <label for="description">Isi Catatan :</label>
                    <input type="text" id="description" required/>
                    
                    <div class="button-submit">
                        <button type="submit">Tambahkan</button>
                    </div>
                </form>
            </div>
        </div>
      `;
  }
}

customElements.define("note-card", NoteCard);
