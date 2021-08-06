export const stores = [
  {
    name: 'steam',
    id: 1,
    deals: [],
  },
  {
    name: 'gog',
    id: 7,
    deals: [],
  },
  {
    name: 'epic',
    id: 25,
    deals: [],
  },
  {
    name: 'origin',
    id: 8,
    deals: [],
  },
];

export const fetchDeals = () => {
  stores.forEach((store) => {
    fetchStoreDeals(store)
      .then((data) => {
        store.deals = data;
        displayDeals(store);
      })
      .catch((error) => console.log(error));
  });

  //start loading animation for each list
  const loaderList = document.querySelectorAll('.deals__loader-container');
  loaderList.forEach((loader) => {
    loader.classList.add('active');
  });
};

const fetchStoreDeals = async (store) => {
  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${store.id}&upperPrice=20&pageSize=7`
  );
  const data = response.json();
  return data;
};

const displayDeals = (store) => {
  const listMobile = document.querySelector(`.${store.name}-deals__mobile`);
  const list = document.querySelector(`.${store.name}-deals`);

  //end loading animations
  const loaderList = document.querySelectorAll(`.${store.name}-loader`);
  loaderList.forEach((loader) => {
    loader.classList.remove('active');
  });

  store.deals.forEach((deal) => {
    const li = `
        <li class="element">
          <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">
            <p class="element__title">${deal.title}</p>
            <p class="element__price">$${deal.normalPrice}</p>
            <p class="element__deal">$${deal.salePrice}</p>
          </a>
        </li>`;

    listMobile.insertAdjacentHTML('beforeend', li);
    list.insertAdjacentHTML('beforeend', li);
  });

  const buttonExplore = `<a href="./top-deals.html#${store.id}"><button>see more...</button></a>`;
  list.insertAdjacentHTML('beforeend', buttonExplore);
  listMobile.insertAdjacentHTML('beforeend', buttonExplore);
};

export const switchStore = () => {
  const logos = document.querySelectorAll('.deals_mobile__logo');
  logos.forEach((element) => {
    element.addEventListener('click', () => {
      //remove class 'active' from whatever logo currently active
      logos.forEach((logo) => {
        logo.classList.remove('active');
      });
      element.classList.add('active');

      //pass store name as an argument
      switchDeals(element.classList[1]);
    });
  });
};

const switchDeals = (storeName) => {
  //remove class 'active' from whatever ul currently active
  const list = document.querySelectorAll(`ul`);
  list.forEach((element) => {
    element.classList.remove('active');
  });

  const listToActivate = document.querySelector(`.${storeName}-deals__mobile`);
  listToActivate.classList.add('active');
};
