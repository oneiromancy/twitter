// Search Functionality
const searchInput = document.querySelector(".search-bar__input");
const searchBtn = document.querySelector(".search-bar__btn");

searchBtn.onclick = e => {
    e.preventDefault();
    location.href = `/search?q=${searchInput.value}`;
};
