function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const result = [];
  const home = books.filter((book) => {
    return book.borrows.every((each) => each.returned === true);
  });

  const rent = books.filter((book) => {
    return book.borrows.some((each) => each.returned === false);
  });

  result.push(rent);
  result.push(home);
  return result;
}

function getBorrowersForBook(book, accounts) {
  const borrowers = accounts.filter((person) => {
    return book.borrows.find((status) => person.id == status.id);
  });
  const borrowStat = (id) => {
    return book.borrows.find((person) => {
      return person.id == id;
    });
  };

  const chris = borrowers.map((person) => {
    return {
      ...person,
      returned: borrowStat(person.id).returned,
    };
  });

  console.log(chris);
  return chris.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
