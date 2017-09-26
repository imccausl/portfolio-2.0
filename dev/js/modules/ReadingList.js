import isLocalStorageAvailable, {
  saveToLocalStorage
} from "../util/localStorage";

const ReadingList = (fetch, key) => {
  const CURR_READING_VIEW = "#currently-reading--view";
  // Used for saving and fetching to local Storage
  const READING_LIST_KEY = "readingListView";
  // used to store data from local storage and compare to new data from server.
  let readingListView = null;

  function getShelf(shelf) {
    shelf = shelf || "currently-reading";
    const currReadingURL = `https://www.goodreads.com/review/list/15487566.xml?key=${key}&id=15487566-ian-mccausland&v=2&shelf=${shelf}`;

    fetch(currReadingURL, "xml", true)
      .then(response => {
        const book = response.getElementsByTagName("book")[0];
        if (book !== undefined) {
          const bookTitle = book.childNodes[11].textContent;
          const bookAuthorNode = book.childNodes[41].innerHTML;
          const bookGrId = book.childNodes[1].textContent;
          const bookURL = "https://www.goodreads.com/book/show/" + bookGrId;
          const bookAuthor = bookAuthorNode.substring(
            bookAuthorNode.indexOf("<name>") + 6,
            bookAuthorNode.indexOf("</name>")
          );

          render(makeView(bookTitle, bookAuthor, bookURL), CURR_READING_VIEW);
        } else {
          render(
            makeView(
              "Programming JavaScript Applications: Robust Web Architecture With Node, HTML5, and Modern JS Libraries",
              "Eric Elliott",
              "https://www.goodreads.com/book/show/15812614"
            ),
            CURR_READING_VIEW
          );
        }
      })
      .fail(err => {
        console.warn(
          "An error occurred trying to render the Reading List view:",
          err
        );
        render(
          makeView(
            "Programming JavaScript Applications: Robust Web Architecture With Node, HTML5, and Modern JS Libraries",
            "Eric Elliott",
            "https://www.goodreads.com/book/show/15812614"
          ),
          CURR_READING_VIEW
        );
      });
  }

  function makeView(title, author, url) {
    return `I am currently reading <a href="${url}">${title}</a> by <span class="text--salient">${author}</span>.`;
  }

  function render(view, elem) {
    const anchor = document.querySelector(elem);
    const didSave = saveToLocalStorage(READING_LIST_KEY, view, readingListView);

    anchor.innerHTML = view;
  }

  if (isLocalStorageAvailable()) {
    readingListView = localStorage.getItem(READING_LIST_KEY);
    if (readingListView) {
      render(readingListView, CURR_READING_VIEW);
    }
  }

  // module execution begins here.
  getShelf();
};

export default ReadingList;
