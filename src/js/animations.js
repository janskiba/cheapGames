export default function scroll() {
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
}
