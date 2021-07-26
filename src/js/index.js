import scroll from './animations.js';
import toggleMenu from './navbar/navbar.js';
import { fetchDeals } from './api/top-deals.js';

toggleMenu();
scroll();
fetchDeals();
