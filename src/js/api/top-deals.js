let stores = [
  {
    name: 'Steam',
    id: 1,
    deals: [],
  },
  {
    name: 'GOG',
    id: 7,
    deals: [],
  },
  {
    name: 'Epic Games Store',
    id: 25,
    deals: [],
  },
  {
    name: 'Origin',
    id: 8,
    deals: [],
  },
];

export const fetchDeals = () => {
  stores.forEach((store) => {
    fetchStoreDeals(store)
      .then((data) => {
        store.deals = data;
        console.log(store.name, store.deals);
      })
      .catch((error) => console.log(error));
  });
};

const fetchStoreDeals = async (store) => {
  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${store.id}&upperPrice=20&pageSize=7`
  );
  const data = response.json();
  return data;
};
