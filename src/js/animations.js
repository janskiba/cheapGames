//object for all html elements needed for animations
export const elements = {
  exploreButton: document.querySelector('.elipse-inner button'),
  dealsSection: document.querySelector('.deals'),
};

//function is reusable by taking two arguments:
//  - 'from' which tells on what element in html function is activated
//  - 'to' which tells to what element whould be scrolled
// ! works only on event 'click'
export function scroll(from, to) {
  from.addEventListener('click', () => {
    to.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
