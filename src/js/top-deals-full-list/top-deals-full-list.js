const store = {
  id: '',
  name: '',
};

export const getStoreName = () => {
  //get full url
  const url = window.location.href;

  //split url on '#' to get the 'id' and 'name' of a store
  store.id = url.split('#')[1];
  store.name = url.split('#')[2];
  displayTitle(store.name);
  console.log('store name: ', store.name, '. store id: ', store.id);
  console.log('The URL of this page is: ', url);

  fetchDeals(store.id).then((data) => {
    displayDeals(data, store);
  });
};

const displayTitle = (storeName) => {
  const titleContainer = document.querySelector('.title');
  if (storeName == 'epic') storeName = 'epic games';
  const title = `<h2>Full list of deals from ${storeName}</h2>`;
  titleContainer.insertAdjacentHTML('afterbegin', title);
};

const fetchDeals = async (storeId) => {
  //start loading animation
  const loader = document.querySelector('.loader-container');
  loader.classList.add('active');

  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${storeId}&upperPrice=20&`
  );
  const data = response.json();

  //end loading animation
  loader.classList.remove('active');

  return data;
};

const displayDeals = (deals, store) => {
  const list = document.getElementById(`${store.id}`);
  let style;
  let counter = 0;
  deals.forEach((deal) => {
    ++counter;
    counter % 2 != 0 ? (style = 'color') : (style = '');
    const li = `
        <li class="element ${style}">
          <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">
            <p class="element__title">${deal.title}</p>
            <p class="element__price">$${deal.normalPrice}</p>
            <p class="element__deal">$${deal.salePrice}</p>
          </a>
        </li>`;

    list.insertAdjacentHTML('beforeend', li);
  });
};
