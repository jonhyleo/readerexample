// Import our custom CSS
import '../scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

/* function updateScrollbarWidthCSSVariable() {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  document.body.style.setProperty('--scrollbarWidth', `${scrollbarWidth}px`);
}

window.addEventListener('DOMContentLoaded', updateScrollbarWidthCSSVariable);
window.addEventListener('resize', updateScrollbarWidthCSSVariable); */

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Enable Bootstrap tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
bookmarkBtns.forEach((btn) => {
  const link = btn.dataset.link; // Get the link from the data-link attribute
  const name = btn.dataset.name; // Get the name from the data-name attribute
  // If the link is already bookmarked, set the right icon
  const bookmarkList = JSON.parse(localStorage.getItem('bookmarks')) || [];
  const bookmarkExists = bookmarkList.some((item) => item.link === link && item.name === name);
  const bookmarkIconAdd = btn.querySelector('i.bi-bookmark-plus');
  const bookmarkIconAdded = btn.querySelector('i.bi-bookmark-check-fill');
  if (bookmarkExists) {
    bookmarkIconAdd.classList.remove('bi-bookmark-plus');
    bookmarkIconAdd.classList.add('bi-bookmark-check-fill');
  }
  if (bookmarkIconAdded) {
    bookmarkIconAdded.classList.remove('bi-bookmark-check-fill');
    bookmarkIconAdded.classList.add('bi-bookmark-plus');
  }

  btn.addEventListener('click', () => {
    // Hide tooltip on click
    const tooltip = bootstrap.Tooltip.getInstance(btn);
    tooltip.hide();

    // Change the bookmark icon from bi-bookmark-plus to bi-bookmark-check-fill
    const bookmarkIcon = btn.querySelector('i.bi-bookmark-plus');
    if (bookmarkIcon) {
      bookmarkIcon.classList.remove('bi-bookmark-plus');
      bookmarkIcon.classList.add('bi-bookmark-check-fill');
    } else {
      const bookmarkIcon = btn.querySelector('i.bi-bookmark-check-fill');
      bookmarkIcon.classList.remove('bi-bookmark-check-fill');
      bookmarkIcon.classList.add('bi-bookmark-plus');
    }

    // Save the link and name to localStorage as an array of objects with a link and name properties and avoid duplicates by checking if the link and name already exists in the array
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let bookmarkExists = bookmarks.some((item) => item.link === link && item.name === name);
    if (!bookmarkExists) {
      bookmarks.push({ link, name });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      bookmarks = bookmarks.filter((item) => item.link !== link && item.name !== name);
      console.log(bookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    console.log(bookmarks);

    // Populate the bookmarks list into .saved-bookmarks div as a list of links
    getBookmarks(bookmarks);
  });
});

const viewBookmarksBtn = document.querySelector('.bookmark-all');
viewBookmarksBtn.addEventListener('click', () => {
  // Hide tooltip on click
  const tooltip = bootstrap.Tooltip.getInstance(viewBookmarksBtn);
  tooltip.hide();
});

// populate the bookmarks list into .saved-bookmarks div as a list of links
function getBookmarks(bookmarks) {
  const savedBookmarks = document.querySelector('.saved-bookmarks');

  if (bookmarks.length > 0) {
    savedBookmarks.innerHTML = bookmarks
      .map((item) => {
        const { link, name } = item;
        return `<li class="list-group-item list-group-item-action">
                  <i class="bi bi-bookmark-fill"></i>
                  <a class="link-dark stretched-link" href="${link}">${name}</a>
                </li>`;
      })
      .join('');
  } else {
    savedBookmarks.innerHTML = '<li class="list-group-item">No bookmarks yet</li>';
  }
}

getBookmarks(JSON.parse(localStorage.getItem('bookmarks')) || []);
