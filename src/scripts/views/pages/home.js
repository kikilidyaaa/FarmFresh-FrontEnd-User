import farmSource from '../../data/thefarmdb-source';
import { createVegetableItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div id="inline-button" class="inline-button">
        <button class="All"><i class="fas fa-box"></i> Produk</button>
        <button><i class="fas fa-tag"></i> Promo</button>
        <button class="Sayuran"><i class="fas fa-carrot"></i> Sayuran</button>
        <button class="Bumbu"><i class="fas fa-pepper-hot"></i> Bumbu Dapur</button>
        <button class="Buah"><i class="fas fa-apple-alt"></i> Buah</button>
    </div> 
    <div class="content">
      <div class="section">
        <h2 class="vegetable-list-title">Semua Produk</h2>
        <div class="scroll-wrapper">
          <button class="scroll-left">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="vegetable-list" id="vegetable-list-all">
            <!-- vegetable items will be inserted here -->
          </div>
          <button class="scroll-right">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="section">
        <h2 class="vegetable-list-title">Buah</h2>
        <div class="scroll-wrapper">
          <button class="scroll-left">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="vegetable-list" id="vegetable-list-buah">
            <!-- vegetable items will be inserted here -->
          </div>
          <button class="scroll-right">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="section">
        <h2 class="vegetable-list-title">Sayur</h2>
        <div class="scroll-wrapper">
          <button class="scroll-left">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="vegetable-list" id="vegetable-list-sayur">
            <!-- vegetable items will be inserted here -->
          </div>
          <button class="scroll-right">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="section">
        <h2 class="vegetable-list-title">Bumbu</h2>
        <div class="scroll-wrapper">
          <button class="scroll-left">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="vegetable-list" id="vegetable-list-bumbu">
            <!-- vegetable items will be inserted here -->
          </div>
          <button class="scroll-right">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const checkLogin = () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        window.location.href = './login.html';
      }
    };
  
    // Check if user is logged in before proceeding
    checkLogin();
    
    const products = await farmSource.listProducts();
    const sections = document.querySelectorAll('.section');

    sections.forEach((section, index) => {
      const vegetableListElement = section.querySelector('.vegetable-list');
      let filteredProducts;
    
      switch (index) {
        case 0:
          // Semua Produk
          filteredProducts = products;
          break;
        case 1:
          // Buah
          filteredProducts = products.filter((product) => product.type === 'Buah');
          break;
        case 2:
          // Sayur
          filteredProducts = products.filter((product) => product.type === 'Sayuran');
          break;
        case 3:
          // Bumbu
          filteredProducts = products.filter((product) => product.type === 'Bumbu Dapur');
          break;
        default:
          filteredProducts = [];
      }
    
      vegetableListElement.innerHTML = filteredProducts.map(createVegetableItemTemplate).join('');
    
      // Setelah memasukkan template, tambahkan event listener untuk setiap item di dalam list
      filteredProducts.forEach(product => {
        const productId = product.id;
        const addToCartButton = vegetableListElement.querySelector(`#vegetable-item-${productId} .add-to-cart-button`);
    
        if (addToCartButton) {
          addToCartButton.addEventListener('click', () => {
            addToCart(productId, product.name);
          });
        }
      });
    });
    function handleScroll(scrollButton, vegetableList) {
      const itemWidth = 320;

      scrollButton.addEventListener('click', () => {
        const scrollAmount = scrollButton.classList.contains('scroll-left') ? -itemWidth : itemWidth;
        vegetableList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    sections.forEach((section) => {
      const scrollLeftButton = section.querySelector('.scroll-left');
      const scrollRightButton = section.querySelector('.scroll-right');
      const vegetableList = section.querySelector('.vegetable-list');
      handleScroll(scrollLeftButton, vegetableList);
      handleScroll(scrollRightButton, vegetableList);
    });

    // Event listener untuk inline-button
    document.getElementById('inline-button').addEventListener('click', async (event) => {
      const buttonClass = event.target.classList[0]; // Ambil class dari tombol yang diklik

      let type = 'all'; // Default type
      switch (buttonClass) {
        case 'All':
          type = 'all';
          break;
        case 'Buah':
          type = 'Buah';
          break;
        case 'Sayuran':
          type = 'Sayuran';
          break;
        case 'Bumbu':
          type = 'Bumbu Dapur';
          break;
        default:
          break;
      }

      // Simpan jenis produk yang dipilih ke sessionStorage
      sessionStorage.setItem('selectedType', type);

      // Navigasi ke halaman List
      window.location.hash = '/list';
    });
  },
};

export default Home;
