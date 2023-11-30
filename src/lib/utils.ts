import HSOverlay from '@preline/overlay'
import { Book } from './objects'
import {
  bookContainer,
  booksQuantityEle,
  infoNavbar,
  noBookEle,
  welcomeNavbar
} from './elements'

const LS_ID = 'BOOKS'

let books = getBooksFromLocalStorage()

/**
 * Adds a book to the library.
 *
 * @param {Book} book - The book to be added.
 */
export function addBookToLibrary(book: Book) {
  books = [...books, book]

  bookContainer!.appendChild(book.getElement)

  updateUI()
  saveBooksFromLocalStorage()
}

export function removeBookFromLibrary(id: string) {
  books = books.filter((book) => book.id !== id)

  bookContainer!.innerHTML = ''
  books.forEach((book) => bookContainer!.appendChild(book.getElement))

  updateUI()
  saveBooksFromLocalStorage()
}

/**
 * Closes a modal element.
 *
 * @param {string} selector - The CSS selector of the modal element to close.
 * @throws {Error} Don't call this function if the modal is not shown.
 */
export function closeModal(selector: string) {
  const modalEle = document.querySelector<HTMLElement>(selector)

  if (modalEle === null || modalEle.classList.contains('hidden')) {
    throw new Error(
      `Don't call this function if the modal '${selector}' is not shown`
    )
  }

  HSOverlay.close(modalEle)
}

/**
 * Updates the UI based on the length of the books array.
 *
 * @return {void} Does not return a value
 */
export function updateUI() {
  if (books.length === 0) {
    uiWhenThereNoBooks()
  } else {
    uiWhenThereBooks()
  }

  booksQuantityEle!.textContent = books.length.toString()
}

function uiWhenThereNoBooks() {
  if (noBookEle!.classList.contains('hidden')) {
    noBookEle!.classList.remove('hidden')
    noBookEle!.classList.add('flex')
  }

  if (bookContainer!.classList.contains('flex')) {
    bookContainer!.classList.remove('flex')
    bookContainer!.classList.add('hidden')
  }

  if (welcomeNavbar!.classList.contains('hidden')) {
    welcomeNavbar!.classList.remove('hidden')
    welcomeNavbar!.classList.add('flex')
  }

  if (infoNavbar!.classList.contains('flex')) {
    infoNavbar!.classList.remove('flex')
    infoNavbar!.classList.add('hidden')
  }
}

function uiWhenThereBooks() {
  if (noBookEle!.classList.contains('flex')) {
    noBookEle!.classList.remove('flex')
    noBookEle!.classList.add('hidden')
  }

  if (bookContainer!.classList.contains('hidden')) {
    bookContainer!.classList.remove('hidden')
    bookContainer!.classList.add('flex')
  }

  if (welcomeNavbar!.classList.contains('flex')) {
    welcomeNavbar!.classList.remove('flex')
    welcomeNavbar!.classList.add('hidden')
  }

  if (infoNavbar!.classList.contains('hidden')) {
    infoNavbar!.classList.remove('hidden')
    infoNavbar!.classList.add('flex')
  }
}

/**
 * Retrieves a list of books from local storage.
 *
 * @return {Array<Book>} The list of books retrieved from local storage.
 */
function getBooksFromLocalStorage() {
  const books = new Array<Book>()
  const items = localStorage.getItem(LS_ID)

  if (items !== null && items.length !== 0) {
    JSON.parse(items).forEach((item: Book) => {
      books.push(new Book(item))
    })
  }

  return books
}

/**
 * Saves the books from local storage.
 *
 * @return {void} Does not return a value.
 */
function saveBooksFromLocalStorage() {
  localStorage.setItem(LS_ID, JSON.stringify(books))
}
