class AppFooter extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
            <div class="footer-container">
                <div class="footer-left">
                    <a href="#"><img src="/logo.png" alt="Logo" class="logo" /></a>
                </div>
                <div class="footer-center">
                    <nav>
                        <a href="#/home">Home</a>
                        <span>•</span>
                        <a href="https://github.com/orgs/FarmFresh-Capstone-Project/repositories" target="_blank" rel="noreferrer">Cara Kerja</a>
                        <span>•</span>
                        <a href="about.html">Tentang Kami</a>
                    </nav>
                </div>
                <div class="footer-right">
                    <a href="https://github.com/orgs/FarmFresh-Capstone-Project/repositories" target="_blank" rel="noreferrer"><i class="bx bxl-github"></i></a>
                    <a href="#"><i class="bx bxl-instagram"></i></a>
                    <a href="https://youtube.com/playlist?list=PLv9DaVdgeY_96IYWVshZN1mu3-UJ6x_5r&si=vMRvQXBLAgW3jTZs" target="_blank" rel="noreferrer"><i class="bx bxl-youtube"></i></a>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>©2024 All Rights Reserved. Design by Farm Fresh team's</p>
            </div>
          `;
    }
  }
  
  customElements.define("app-footer", AppFooter);