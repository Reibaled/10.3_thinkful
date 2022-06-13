function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const borrowed = books.filter((book) =>
    book.borrows.some((person) => person.id == account.id)
  );
  return borrowed.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowing = books.filter((book) => {
    return book.borrows.find(
      (person) => person.id == account.id && person.returned == false
    );
  });
  const findAuthor = (id) => {
    return authors.find((writer) => writer.id == id);
  };

  return borrowing.map((book) => {
    return {
      ...book,
      author: findAuthor(book.authorId),
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
