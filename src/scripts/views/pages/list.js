import farmSource from '../../data/thefarmdb-source';
import { createVegetableItemTemplate } from '../templates/template-creator';

const List = {
  async render() {
    return `
      <div class="content">
        <div class="header">
          <button class="back-button"><i class="fas fa-arrow-left"></i></button>
          <h2 class="content__heading" id="content-heading">All Items</h2>
        </div>
        <div id="vegetable-item-list" class="vegetable-item-list">
          
        </div>
      </div>
    `;
  },

  async afterRender() {
    // Ambil jenis produk yang dipilih dari sessionStorage
    const selectedType = sessionStorage.getItem('selectedType') || 'all';

    // Ambil semua produk dari farmSource
    const products = await farmSource.listProducts();

    // Filter produk berdasarkan jenis yang dipilih
    const filteredProducts = selectedType === 'all' ? products : products.filter(product => product.type === selectedType);

    // Update judul konten sesuai dengan jenis produk yang dipilih
    const contentHeading = document.getElementById('content-heading');
    switch (selectedType) {
      case 'all':
        contentHeading.textContent = 'All Items';
        break;
      case 'Buah':
        contentHeading.textContent = 'Buah';
        break;
      case 'Sayuran':
        contentHeading.textContent = 'Sayuran';
        break;
      case 'Bumbu Dapur':
        contentHeading.textContent = 'Bumbu Dapur';
        break;
      default:
        contentHeading.textContent = 'All Items';
    }

    // Render produk ke dalam HTML
    const productContainer = document.querySelector('#vegetable-item-list');
    productContainer.innerHTML = filteredProducts.map(createVegetableItemTemplate).join('');

    // Event listener untuk tombol "back"
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      // Ganti halaman saat ini dengan halaman sebelumnya dalam riwayat
      window.history.replaceState(null, '', window.location.origin + '/#home');
      // Kembali ke halaman Home
      window.location.hash = '/home';
    });
  },
};

export default List;
