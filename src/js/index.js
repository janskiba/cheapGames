import scroll from './animations.js';
import { setNavLinkActiveOnScroll } from './animations.js';
import toggleMenu from './navbar/navbar.js';
import {
  fetchDeals,
  switchStore as switchTopDealsSection,
} from './top-deals-homepage/top-deals-homepage.js';

toggleMenu(true);
scroll();
setNavLinkActiveOnScroll();
fetchDeals();
switchTopDealsSection();
