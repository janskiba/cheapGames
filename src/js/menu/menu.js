function toggleMenu() {
  const navbarToggler = document.querySelector('.navbar__toggler');

  navbarToggler.addEventListener('click', () =>
    navbarToggler.classList.toggle('active')
  );
}

export default toggleMenu;
