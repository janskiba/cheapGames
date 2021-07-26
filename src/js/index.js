import scroll from './animations.js';
import toggleMenu from './navbar/navbar.js';
import {
  fetchDeals,
  switchStore as switchTopDealsSection,
} from './api/top-deals.js';

toggleMenu();
scroll();
fetchDeals();
switchTopDealsSection();
