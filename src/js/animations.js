const scroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      let block = document.querySelector(element.getAttribute('href')),
        offset = element.dataset.offset ? parseInt(element.dataset.offset) : 0,
        bodyOffset = document.body.getBoundingClientRect().top;
      window.scrollTo({
        top: block.getBoundingClientRect().top - bodyOffset + offset - 70,
        behavior: 'smooth',
      });

      const navbar = document.querySelector('.navbar');
      const navbarToggler = document.querySelector('.navbar__toggler');
      const menu = document.querySelector('.menu');

      navbarToggler.classList.remove('active');
      menu.classList.remove('active');
      navbar.classList.remove('expanded');
      document.body.classList.remove('hidden');
    });
  });
};

export function setNavLinkActiveOnScroll() {
  const container = document.querySelector('#container');
  const deals = document.querySelector('#deals');
  const homeLink = document.querySelector('a[href="#container"]');
  const topDealsLink = document.querySelector('a[href="#deals"]');
  const aboutLink = document.querySelector('a[href="#about"]');

  addEventListener('scroll', () => {
    if (
      pageYOffset >= container.getBoundingClientRect().top &&
      pageYOffset < container.getBoundingClientRect().bottom
    ) {
      homeLink.style.textDecoration = 'underline';
    } else {
      homeLink.style.textDecoration = 'none';
    }

    if (
      pageYOffset >= container.getBoundingClientRect().bottom &&
      pageYOffset <
        deals.getBoundingClientRect().bottom +
          deals.getBoundingClientRect().height
    ) {
      topDealsLink.style.textDecoration = 'underline';
    } else {
      topDealsLink.style.textDecoration = 'none';
    }

    if (
      pageYOffset - deals.getBoundingClientRect().height >=
      deals.getBoundingClientRect().bottom
    ) {
      aboutLink.style.textDecoration = 'underline';
    } else {
      aboutLink.style.textDecoration = 'none';
    }

    // if (pageYOffset === 0) {
    //   homeLink.style.textDecoration = 'none';
    // }
  });
}

export default scroll;
