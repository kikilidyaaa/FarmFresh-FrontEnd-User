class AppBar extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
              <div class="app-bar-container">
                <a href="#" class="logo"><img src="/logo.png" alt="logo" /></a>

                <ul class="navmenu">
                    <li><a href="#/home">Home</a></li>
                    <li><a href="about.html">Tentang</a></li>
                    <li><a href="#footer">Kontak</a></li>
                    <li><a href="#">Area Pengiriman</a></li>
                </ul>

                <div class="nav-icon">
                    <a href="#/home"><i class="fa-solid fa-magnifying-glass"></i></a>
                    <div id="cart-icon-container">
                      <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>
                      <span id="cart-item-count">0</span>
                    </div>
                    <a href="profile.html" id="profileLink"><i class="fa-solid fa-user"></i></a>
                    <a href="#" id="logout"
                    ><i class="fa-solid fa-right-from-bracket"></i
                    ></a>
                </div>
              </div>
          `;
    }
  }
  
  customElements.define("app-bar", AppBar);