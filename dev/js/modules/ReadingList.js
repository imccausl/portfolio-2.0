const ReadingList = (fetch, key) => {

  function getShelf(shelf) {
    shelf = shelf || "currently-reading";

    const currReadingURL = `https://www.goodreads.com/review/list/15487566.xml?key=${key}&id=15487566-ian-mccausland&v=2&shelf=${shelf}`;

    fetch(currReadingURL, "xml", true).then(response =>{
      const book = response.getElementsByTagName("book")[0];
      const bookTitle = book.childNodes[11].textContent;
      const bookAuthorNode = book.childNodes[41].innerHTML;
      const bookGrId = book.childNodes[1].textContent;
      const bookURL = "https://www.goodreads.com/book/show/" + bookGrId;
      const bookAuthor = bookAuthorNode.substring(bookAuthorNode.indexOf("<name>") + 6, bookAuthorNode.indexOf("</name>"));
     
      render(makeView(bookTitle, bookAuthor, bookURL), "#currently-reading--view");
    });
  }

  function makeView(title, author, url) {
    return `I am currently reading <a href="${url}">${title}</a> by <span class="text--salient">${author}</span>.`
  }

  function render(view, elm) {
    const anchor = document.querySelector(elm);

    anchor.innerHTML = view;
  }

  getShelf();

    return {

    };
};

export default ReadingList;