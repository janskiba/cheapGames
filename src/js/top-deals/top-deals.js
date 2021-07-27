const stores = [
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
};

const fetchStoreDeals = async (store) => {
  //start loading animation
  const loader = document.querySelector('.loader-container');
  loader.classList.add('active');

  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${store.id}&upperPrice=20&pageSize=7`
  );
  const data = response.json();

  //end loading animation
  loader.classList.remove('active');
  return data;
};

const displayDeals = (store) => {
  const list = document.getElementById(`${store.name}`);
  store.deals.forEach((deal) => {
    const li = `
        <li class="element">
          <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">
            <p class="element__title">${deal.title}</p>
            <p class="element__price">$${deal.normalPrice}</p>
            <p class="element__deal">$${deal.salePrice}</p>
          </a>
        </li>`;

    list.insertAdjacentHTML('beforeend', li);
  });

  const buttonExplore = `<a href="#"><button>see more...</button></a>`;
  list.insertAdjacentHTML('beforeend', buttonExplore);
};

export const switchStore = () => {
  const logos = document.querySelectorAll('.deals__logo');
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

  const listToActivate = document.querySelector(`#${storeName}`);
  listToActivate.classList.add('active');
};
