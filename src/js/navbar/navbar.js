function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  const navbarToggler = document.querySelector('.navbar__toggler');
  const menu = document.querySelector('.menu');

  window.addEventListener('scroll', () =>
    pageYOffset > 0
      ? navbar.classList.add('active')
      : navbar.classList.remove('active')
  );

  navbarToggler.addEventListener('click', () => {
    navbarToggler.classList.toggle('active');
    menu.classList.toggle('active');
    navbar.classList.toggle('expanded');

    document.body.classList.toggle('hidden');
  });
}

export default toggleMenu;