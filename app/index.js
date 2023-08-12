// FRONT END VANILLA JS
// Fetches replit API wrapper
const getBookSearchResults = (query, page) => {
  return fetch(`https://meredith-dotdashbackend.alejandraji.repl.co/search?query=${encodeURIComponent(query)}&page=${page}`)
      .then(response => response.json());
};

const searchForm = document.querySelector(".search-form");
const searchResultsContainer = document.querySelector(".search-results");
const paginationContainer = document.querySelector(".pagination-container");      


// render books 
const searchAndRenderBookResultItems = (query, page) => {
  getBookSearchResults(query, page)
    .then(response => {
      searchResultsContainer.innerHTML = "";
      paginationContainer.innerHTML = "";
      const searchResults = response.search.results.work || [];
      if (searchResults.length === 0) {
        searchResultsContainer.innerHTML = "NO RESULTS";
        return;
      }
      const totalResults= parseInt(response.search['total-results']);
      const totalPages = Math.ceil(totalResults/20);
      const previousPage = page - 1;
      const previousButton = document.createElement('button');
      previousButton.innerHTML= "&larr;"
      previousButton.addEventListener('click', () => {
        searchAndRenderBookResultItems(query, previousPage);
      })
      previousButton.disabled = page === 1;
    
    
      const nextPage = page + 1;
      const nextButton = document.createElement('button');
      nextButton.innerHTML= "&rarr;"
      nextButton.addEventListener('click', () => {
        searchAndRenderBookResultItems(query, nextPage);
      })
      nextButton.disabled = totalPages < 2 || page === totalPages;
    
      paginationContainer.appendChild(previousButton);
      paginationContainer.appendChild(nextButton);
    
    
      searchResults.forEach(result => {
        const listItem = document.createElement('li');
        const wrapper = document.createElement('div');
        const titleItem = document.createElement('p');
        const authorName = document.createElement('p');
        const image = document.createElement('img');

        titleItem.innerHTML = `${result.best_book.title}`;
        authorName.innerHTML = `${result.best_book.author.name}`;
        image.src = `${result.best_book.image_url}`;

        searchResultsContainer.appendChild(listItem);
        listItem.appendChild(image);
        listItem.appendChild(wrapper);
        wrapper.appendChild(titleItem);
        wrapper.appendChild(authorName);
      });
     });
}

// handles submission of search query 
function submitHandler(event) {
  event.preventDefault();
  const query = searchForm.querySelector(".search-input").value;
  searchAndRenderBookResultItems(query, 1);
  searchForm.reset();
}

searchForm.addEventListener("submit", submitHandler);
