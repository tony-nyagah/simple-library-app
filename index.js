class Book {
  constructor(title, author, coverImage = null) {
    this.title = title;
    this.author = author;
    this.coverImage = coverImage;
  }
}

// const dummyData = [
//   new Book(
//     "The Great Gatsby",
//     "F. Scott Fitzgerald",
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Celestial_eyes-The_Great_Gatsby_cover-Francis_Cugat-1925.tif/lossy-page1-800px-Celestial_eyes-The_Great_Gatsby_cover-Francis_Cugat-1925.tif.jpg"
//   ),
//   new Book(
//     "To Kill a Mockingbird",
//     "Harper Lee",
//     "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg"
//   ),
//   new Book(
//     "The Catcher in the Rye",
//     "J.D. Salinger",
//     "https://i0.wp.com/www.printmag.com/wp-content/uploads/2010/02/2326a7_851a3aea13cf47e09a8aa28d13e8cd3dmv2.jpg?resize=293%2C490&quality=89&ssl=1"
//   ),
//   new Book(
//     "Feet of Clay",
//     "Sir Terry Pratchett",
//     "https://m.media-amazon.com/images/I/61RHj0p90cL._SY342_.jpg"
//   ),
// ];

// const library = [...dummyData];

const library = []

// Function to save the library data to local storage
function saveLibraryToLocalStorage() {
  try {
    localStorage.setItem("library", JSON.stringify(library));
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
}

// Function to load the library data from local storage
function loadLibraryFromLocalStorage() {
  try {
    const storedLibrary = localStorage.getItem("library");
    if (storedLibrary) {
      library.push(...JSON.parse(storedLibrary));
      displayBooks();
    }
  } catch (error) {
    console.error("Error loading data from local storage:", error);
  }
}

// Call the load function to load the library data on page load
loadLibraryFromLocalStorage();

function addBook() {
  try {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const coverImage = document.getElementById("bookCoverImage").value;

    if (title.trim() === "" || author.trim() === "") {
      alert("Please enter both title and author.");
      return;
    }

    const book = new Book(title, author, coverImage);
    library.push(book);

    displayBooks();
    clearInputFields();
    saveLibraryToLocalStorage();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

function removeBook() {
  try {
    const titleToRemove = prompt("Enter the title of the book to remove:");

    if (!titleToRemove) {
      return;
    }

    switch (titleToRemove) {
      case "":
        alert("Please enter a title to remove.");
        break;
      default:
        const indexToRemove = library.findIndex(
          (book) => book.title === titleToRemove
        );
        if (indexToRemove !== -1) {
          library.splice(indexToRemove, 1);
          displayBooks();
        } else {
          alert("Book not found in the library.");
        }
        break;
    }
    saveLibraryToLocalStorage();
  } catch (error) {
    console.error("Error removing book:", error);
  }
}

function updateBook() {
  try {
    const titleToUpdate = prompt("Enter the title of the book to update:");

    if (!titleToUpdate) {
      return;
    }

    const indexToUpdate = library.findIndex(
      (book) => book.title === titleToUpdate
    );

    if (indexToUpdate !== -1) {
      const newTitle = prompt("Enter the new title:");
      const newAuthor = prompt("Enter the new author:");

      let newCoverImage = null;
      const updateCover = confirm("Do you want to update the cover image?");

      if (updateCover) {
        newCoverImage = prompt("Enter the new cover image URL:");
      }

      if (newTitle.trim() !== "" && newAuthor.trim() !== "") {
        library[indexToUpdate].title = newTitle;
        library[indexToUpdate].author = newAuthor;
        library[indexToUpdate].coverImage = newCoverImage;

        displayBooks();
      } else {
        alert("Please enter both a new title and a new author.");
      }
    } else {
      alert("Book not found in the library.");
    }
    saveLibraryToLocalStorage();
  } catch (error) {
    console.error("Error updating book:", error);
  } finally {
    clearInputFields();
  }
}

// Function to sort the library based on the selected criteria
function sortLibrary(criteria) {
  try {
    switch (criteria) {
      case "title":
        library.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        library.sort((a, b) => a.author.localeCompare(b.author));
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Error sorting library:", error);
  }
}

function displayBooks() {
  const bookShelf = document.querySelector(".book-shelf");
  bookShelf.innerHTML = "";

  // Get the selected sorting criteria
  const sortBy = document.getElementById("sortBy").value;

  // Sort the library based on the selected criteria
  sortLibrary(sortBy);

  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
            <img src="${
              book.coverImage || "placeholder.svg"
            }" alt="Book Cover">        
            <h3>${book.title}</h3>
            <p><strong>Author</strong>: ${book.author}</p>  
        `;
    bookShelf.appendChild(bookCard);
  });
}

function clearInputFields() {
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
}

document.getElementById("addButton").addEventListener("click", addBook);
document.getElementById("removeButton").addEventListener("click", removeBook);
document.getElementById("updateButton").addEventListener("click", updateBook);
// Event listener for the "Sort By" dropdown
document.getElementById("sortBy").addEventListener("change", displayBooks);

displayBooks();
