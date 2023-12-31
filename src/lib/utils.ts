/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HSOverlay } from 'preline'
import {
  bookContainer,
  booksQuantityEle,
  infoNavbar,
  noBookEle,
  welcomeNavbar
} from './elements'
import { Book, type BookProps } from './objects'

const LS_ID = 'BOOKS'

let books = new Array<Book>()

/**
 * Adds a book to the library.
 *
 * @param {Book} book - The book to be added.
 */
export function addBookToLibrary(book: Book): void {
  books = [book, ...books]

  updateUI()
  saveBooksFromLocalStorage()
}

/**
 * Removes an item from the `books` array.
 *
 * @param {string} id - The ID of the book to be removed.
 * @return {void} This function does not return a value.
 */
export function removeBookFromLibrary(id: string): void {
  books = books.filter((book) => book.id !== id)

  updateUI()
  saveBooksFromLocalStorage()
}

/**
 * Closes a modal element.
 *
 * @param {string} selector - The CSS selector of the modal element to close.
 * @throws {Error} Don't call this function if the modal is not shown.
 */
export function closeModal(selector: string): void {
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
export function updateUI(): void {
  if (books.length === 0) {
    uiWhenThereNoBooks()
  } else {
    uiWhenThereBooks()
  }

  if (booksQuantityEle) {
    booksQuantityEle.textContent = books.length.toString()
  }
}

function uiWhenThereNoBooks(): void {
  if (noBookEle?.classList.contains('hidden')) {
    noBookEle.classList.remove('hidden')
    noBookEle.classList.add('flex')
  }

  if (bookContainer?.classList.contains('flex')) {
    bookContainer?.classList.remove('flex')
    bookContainer?.classList.add('hidden')
  }

  if (welcomeNavbar?.classList.contains('hidden')) {
    welcomeNavbar?.classList.remove('hidden')
    welcomeNavbar?.classList.add('flex')
  }

  if (infoNavbar?.classList.contains('flex')) {
    infoNavbar?.classList.remove('flex')
    infoNavbar?.classList.add('hidden')
  }

  if (bookContainer) {
    bookContainer.innerHTML = ''
  }
}

function uiWhenThereBooks(): void {
  if (noBookEle?.classList.contains('flex')) {
    noBookEle?.classList.remove('flex')
    noBookEle?.classList.add('hidden')
  }

  if (bookContainer?.classList.contains('hidden')) {
    bookContainer?.classList.remove('hidden')
    bookContainer?.classList.add('flex')
  }

  if (welcomeNavbar?.classList.contains('flex')) {
    welcomeNavbar?.classList.remove('flex')
    welcomeNavbar?.classList.add('hidden')
  }

  if (infoNavbar?.classList.contains('hidden')) {
    infoNavbar?.classList.remove('hidden')
    infoNavbar?.classList.add('flex')
  }

  if (bookContainer) {
    bookContainer.innerHTML = ''
  }

  books.forEach((book) => bookContainer?.appendChild(book.getElement))
}

/**
 * Retrieves a list of books from local storage.
 *
 * @return {Array<Book>} The list of books retrieved from local storage.
 */
export function setBooksFromLocalStorage(): void {
  const items = JSON.parse(localStorage.getItem(LS_ID) as string)

  if (items !== null && items.length > 0) {
    items.forEach((item: BookProps) => {
      books.push(new Book(item))
    })
  }
}

/**
 * Saves the books from local storage.
 *
 * @return {void} Does not return a value.
 */
function saveBooksFromLocalStorage(): void {
  localStorage.setItem(LS_ID, JSON.stringify(books))
}
