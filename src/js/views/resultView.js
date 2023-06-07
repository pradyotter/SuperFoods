import icons from 'url:../../img/icons.svg';
import View from './View.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes Found.Please try Again';
  _msg = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(res) {
    const id = window.location.hash.slice(1);
    return `
     <li class="preview">
          <a class="preview__link ${
            res.id === id ? 'preview__link--active' : ''
          }" href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="${res.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
                
              </div>
          </a>
     </li>`;
  }
}

export default new ResultView();
