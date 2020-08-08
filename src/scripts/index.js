import "../styles/index.css";
const API_KEY = "38ddf37bfae355c6d8c4d5a34912fe03";


const getElemById = id => document.getElementById(id);
let articleContainerElem = getElemById("news-articles");

const renderNews = news => {
  console.log(news.articles);
  if (news.articles.length) {
    const { articles } = news;
    console.log(articles);

    let articleListElem = "";

    articles.forEach(article => {
      const { title, url } = article;
      const author = (article.source.name);
      articleListElem += `
		    <li class="article">
		      

		      <h2 class="article-title">${title}</h2>


		      <span class="article-author">- ${author ? author : "Anon"}</span>

          <a class="article-link" href="${url}" target="_blank" rel="noopener noreferrer"></a>
		    </li>
		  `;
    });

    articleContainerElem.innerHTML = articleListElem;
  } else {
    articleContainerElem.innerHTML =
      '<li class="not-found">No article was found based on the search.</li>';
  }
};

// Fetch news from API and render the articles
const getNews = async (searchText = "") => {
  articleContainerElem.innerHTML = '<li class="loading">Loading....</li>';
  const url = searchText
    ? `https://gnews.io/api/v3/search?q=${searchText}&token=${API_KEY}`
    : `https://gnews.io/api/v3/top-news?token=${API_KEY}&country=in`;

  const newsResponse = await fetch(url);
  const news = await newsResponse.json();

  renderNews(news);
};

// Search news and render it
const searchNews = async evt => {
  if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
    getNews(evt.target.value);
  }
};

// Initialize methods to fetch and render the news
const init = () => {
  const searchInput = getElemById("search");

  searchInput.addEventListener("keypress", searchNews);

  getNews();
};

(function() {
  articleContainerElem = getElemById("news-articles");

  init();
})();
