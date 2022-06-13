function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const arr = books.filter((book) =>
    book.borrows.some((person) => person.returned === false)
  );

  return arr.length;
}

function getMostCommonGenres(books) {
  const genreCounts = {};

  books.reduce((gc, book) => {
    if (!genreCounts[book.genre]) {
      genreCounts[book.genre] = [];
    }

    genreCounts[book.genre].push(book);
  }, genreCounts);

  const genreCountsArray = [];

  Object.entries(genreCounts).forEach((genre) => {
    const genreName = genre[0];
    const genreData = genre[1];
    const obj = {
      name: genreName,
      count: genreData.length,
    };
    genreCountsArray.push(obj);
  });

  genreCountsArray.sort((a, b) => b.count - a.count);

  return genreCountsArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  books.sort((a, b) => b.borrows.length - a.borrows.length);
  const topFive = books.slice(0, 5);
  const mapFunction = (book) => {
    const obj = {};
    obj.count = book.borrows.length;
    obj.name = book.title;
    return obj;
  };
  return topFive.map(mapFunction);
}

function getMostPopularAuthors(books, authors) {
  let typeOfAuthor = {};
  books.reduce((gc, book) => {
    if (!typeOfAuthor[book.authorId]) {
      typeOfAuthor[book.authorId] = [];
    }

    typeOfAuthor[book.authorId].push(...book.borrows);
  }, typeOfAuthor);

  const authorsArray = [];

  Object.entries(typeOfAuthor).forEach((author) => {
    const authorId = author[0];
    const count = author[1];
    const obj = {
      id: authorId,
      count: count.length,
    };
    authorsArray.push(obj);
  });

  authorsArray.sort((a, b) => b.count - a.count);

  const findAuthorById = (id) => {
    return authors.find((author) => author.id == id);
  };

  const iGotTheAnswer = authorsArray.map((simpleAuthor) => {
    const authorName = findAuthorById(simpleAuthor.id);
    return {
      count: simpleAuthor.count,
      name: authorName.name.first + " " + authorName.name.last,
    };
  });

  return iGotTheAnswer.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
