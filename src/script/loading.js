export class Loading {
  constructor() {
    this.spinner = document.createElement("div");
    this.spinner.className = "loading";
    this.spinner.innerHTML = `
        <div class="spinner"></div>
      `;
    document.body.appendChild(this.spinner);
  }

  show() {
    this.spinner.style.display = "flex"; // Use 'flex' to enable centering
  }

  hide() {
    this.spinner.style.display = "none";
  }
}
