import 'regenerator-runtime';
import App from './views/app';

import '../scripts/views/components/app-bar';
import '../scripts/views/components/app-hero';
import '../scripts/views/components/app-footer';
import swRegister from './utils/sw-register';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    content: document.querySelector('#mainContent'),
  });

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
  });
});
