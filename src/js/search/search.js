const form = document.querySelector('.search__bar form');
const input = document.querySelector('.search__bar input');
const searchOptions = document.querySelector('.search__options');
const gamesElement = document.querySelector('.games');

let flag = false;
let suggestionIndex = -1;

function search(
  options = {
    limit: 5,
  }
) {
  const baseURL = `https://www.cheapshark.com/api/1.0/games?limit=${options.limit}&title=`;
  const debouncedInputHandler = debounce(() => inputHandler(baseURL), 250);

  form.addEventListener('submit', (event) => submitHandler(event, baseURL));
  input.addEventListener('input', debouncedInputHandler);
  input.addEventListener('focus', focusHandler);
  input.addEventListener('blur', () => (flag = true));
  document.addEventListener('click', documentClickHandler);
  document.addEventListener('keydown', keydownHandler);
  searchOptions.addEventListener('mouseover', mouseoverHandler);
}

//debounce
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// game search autocomplete list
async function fetchGameTitles(url) {
  const res = await fetch(url);
  const games = await res.json();

  games.length > 0
    ? searchOptions.classList.add('active')
    : searchOptions.classList.remove('active');

  searchOptions.firstElementChild.innerHTML = games
    .map((game) => {
      return `<li tabindex="0">${game.external}</li>`;
    })
    .join('');

  return games;
}

// focus search suggestions with arrow keys
function keydownHandler(event) {
  if (searchOptions.classList.contains('active')) {
    // disable arrow scrolling
    window.addEventListener(
      'keydown',
      function (e) {
        if (['ArrowUp', 'ArrowDown'].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      },
      false
    );

    const suggestions = searchOptions.firstElementChild.querySelectorAll('li');
    if (event.code === 'ArrowDown') {
      if (suggestionIndex === suggestions.length - 1) return;
      suggestionIndex++;
      suggestions[suggestionIndex].focus();
    }

    if (event.code === 'ArrowUp') {
      if (suggestionIndex <= 0) {
        suggestionIndex = 0;
        return;
      }
      suggestionIndex--;
      suggestions[suggestionIndex].focus();
    }

    if (event.code === 'Enter') {
      suggestions[suggestionIndex].click();
    }
  }
}

// fetch multiple games data
async function fetchGames(url) {
  const res = await fetch(url);
  const data = res.json();
  return data;
}

// fetch game data
async function fetchGame(gameID) {
  async function fetchGameData() {
    const res = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${gameID}`
    );
    const game = await res.json();
    return game;
  }
  async function fetchStoresData() {
    const res = await fetch('https://www.cheapshark.com/api/1.0/stores');
    const stores = await res.json();
    return stores;
  }

  const [game, stores] = await Promise.all([
    fetchGameData(),
    fetchStoresData(),
  ]);

  gamesElement.innerHTML = '';

  const offers = game.deals.map((deal) => {
    const store = stores.find((store) => store.storeID === deal.storeID);
    const redirectURL = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;

    return `
      <a href="${redirectURL}" target="_blank">
        <li>
            <span>
              <img src="${'https://cheapshark.com' + store.images.logo}" /> ${
      store.storeName
    }
            </span>
            <span>$${deal.price}</span>
        </li>
      </a>
    `;
  });

  gamesElement.innerHTML = `
    <div class="game">
      <img src="${game.info.thumb}" alt="game logo" />
      <p class="game__title">${game.info.title}</p>
      <p class="game__lowest-price">lowets price <span>$${
        game.deals[0].price
      }</span></p>
      <button class="game__offers-button">see offers</button>
      <ul class="game__offers">
        ${offers.join('')}
      </ul>
    </div>
  `;

  const gameElement = document.querySelector('.game');
  gameElement.classList.remove('active');

  const offersButton = document.querySelector('.game__offers-button');
  offersButton.addEventListener('click', () => {
    gameElement.classList.toggle('active');
    gameElement.classList.contains('active')
      ? (offersButton.textContent = 'hide offers')
      : (offersButton.textContent = 'see offers');
  });
}

// event handlers
async function submitHandler(event, baseURL) {
  event.preventDefault();
  if (input.value.length === 0) return;
  gamesElement.innerHTML = '';

  async function fetchStoresData() {
    const res = await fetch('https://www.cheapshark.com/api/1.0/stores');
    const stores = await res.json();
    return stores;
  }
  const [stores, games] = await Promise.all([
    fetchStoresData(),
    fetchGames(baseURL + input.value),
  ]);

  const gameIDs = games.map((game) => game.gameID);
  const url =
    baseURL.substring(0, baseURL.length - 6) + `ids=${gameIDs.join(',')}`;

  const res = await fetch(url);
  const detailedGamesObject = await res.json();

  const detailedGamesObjectKeys = Object.keys(detailedGamesObject);
  const detailedGames = detailedGamesObjectKeys.map((key) => {
    return detailedGamesObject[key];
  });
  detailedGames.forEach((detailedGame) => {
    const offers = detailedGame.deals.map((deal) => {
      const store = stores.find((store) => store.storeID === deal.storeID);
      const redirectURL = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;

      return `
        <a href="${redirectURL}" target="_blank">
          <li>
            <span>
              <img src="${'https://cheapshark.com' + store.images.logo}" /> ${
        store.storeName
      }
            </span>
            <span>$${deal.price}</span>
          </li>
        </a>`;
    });

    gamesElement.innerHTML += `
      <div class="game">
        <img src="${detailedGame.info.thumb}" alt="game logo" />
        <p class="game__title">${detailedGame.info.title}</p>
        <p class="game__lowest-price">lowets price <span>$${
          detailedGame.deals[0].price
        }</span></p>
        <button class="game__offers-button">see offers</button>
        <ul class="game__offers">
          ${offers.join('')}
        </ul>
      </div>
    `;
  });

  const offerButtons = document.querySelectorAll('.game__offers-button');
  offerButtons.forEach((offerButton) => {
    const gameElement = offerButton.parentElement;
    offerButton.addEventListener('click', () => {
      gameElement.classList.toggle('active');
      gameElement.classList.contains('active')
        ? (offerButton.textContent = 'hide offers')
        : (offerButton.textContent = 'see offers');
    });
  });
}

async function inputHandler(baseURL) {
  if (input.value.length === 0) return;

  suggestionIndex = -1;

  const games = await fetchGameTitles(baseURL + input.value);

  if (games.length > 0) {
    const searchOptionsListItems = document.querySelectorAll(
      '.search__options ul li'
    );
    searchOptionsListItems.forEach((searchOptionsListItem, index) => {
      searchOptionsListItem.addEventListener('click', () => {
        fetchGame(games[index].gameID);
      });
    });
  }
}

function focusHandler(event) {
  flag = true;
  suggestionIndex = -1;
  if (
    event.target.value.length > 0 &&
    searchOptions.firstElementChild.childElementCount > 0
  )
    searchOptions.classList.add('active');
}

function mouseoverHandler() {
  const suggestions = searchOptions.querySelectorAll('li');
  suggestions.forEach((suggestion) => suggestion.blur());
}

function documentClickHandler() {
  if (flag && document.activeElement !== input)
    searchOptions.classList.remove('active');
}

export default search;
