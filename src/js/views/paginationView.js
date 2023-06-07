import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    console.log(numPages);

    if (currentPage === 1 && numPages > 1)
      return `<button data-goto=${
        currentPage + 1
      } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;

    if (currentPage === numPages && numPages > 1)
      return `<button data-goto=${
        currentPage - 1
      } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> Page ${currentPage - 1}</span>
          </button>`;
    if (currentPage < numPages)
      return `<button data-goto=${
        currentPage - 1
      } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> Page ${currentPage - 1}</span>
          </button>
          <button data-goto=${
            currentPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
          `;
    return '';
  }
}

export default new PaginationView();
