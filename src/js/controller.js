import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookMarkView from './views/bookMarkView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

console.log('Test');
///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultPage());
    bookMarkView.update(model.state.bookmarks);

    // 1.Loading Recipe
    await model.loadRecipe(id);

    // 2.Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);

    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotoPage) {
  resultView.render(model.getSearchResultPage(gotoPage));

  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  model.updateServing(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.delBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookMarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookMarkView.render(model.state.bookmarks);
};

const init = function () {
  bookMarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandleClick(controlPagination);
};

init();
