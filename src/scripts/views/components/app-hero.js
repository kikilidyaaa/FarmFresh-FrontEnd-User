class AppHero extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
            <!-- Jumbotron -->
            <section class="jumbotron">
                <div class="jumbotron-title">
                    <h1>
                    <span class="word1">100%</span> <span class="word2">Organic</span>
                    </h1>
                    <h1>"Dapatkan Sayuran Terbaik Langsung Dari Petani"</h1>
                    <a href="#" class="main-btn"
                    >Shop Now <i class="bx bx-right-arrow-alt"></i
                    ></a>
                </div>
            </section>
          `;
    }
  }
  
  customElements.define("app-hero", AppHero);