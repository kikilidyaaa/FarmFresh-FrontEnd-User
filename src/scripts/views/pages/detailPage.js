import UrlParser from '../../routes/url-parser';
import farmSource from '../../data/thefarmdb-source';
import { createProductDetailTemplate, createVegetableItemTemplate } from '../templates/template-creator';

const DetailPage = {
  async render() {
    return `
      <div class="container">
        <div id="product-detail-container" class="product-detail-container"></div>
        <section class="related-products">
          <h3>Sering dibeli bersama</h3>
          <div class="related-product-list" id="related-product-list">
            <!-- related product items will be inserted here -->
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const productId = url.id;
    
    // Fetch product details
    const product = await farmSource.detailProducts(productId);
    
    // Fetch related products (adjust this logic based on your API response)
    const relatedProducts = await farmSource.listProducts(productId);
    
    const productDetailContainer = document.getElementById('product-detail-container');
    productDetailContainer.innerHTML = createProductDetailTemplate(product);
    
    const relatedProductListElement = document.getElementById('related-product-list');
    const limitedRelatedProducts = relatedProducts.slice(0, 6);

    relatedProductListElement.innerHTML = limitedRelatedProducts.map(createVegetableItemTemplate).join('');
  
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      // Ganti halaman saat ini dengan halaman sebelumnya dalam riwayat
      window.history.replaceState(null, '', window.location.origin + '/#home');
      // Kembali ke halaman Home
      window.location.hash = '/home';
    });
  },
};

export default DetailPage;
