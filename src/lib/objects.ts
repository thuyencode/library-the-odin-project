import { removeBookFromLibrary } from './utils'

export interface BookProps {
  id?: string
  title: string
  authors: string
  description: string
  pages: number
}

export class Book {
  id: string
  title: string
  authors: string
  description: string
  pages: number

  /**
   * Constructs a new Book object.
   *
   * @param {BookProps} id - The ID of the book.
   * @param {BookProps} title - The title of the book.
   * @param {BookProps} authors - The authors of the book.
   * @param {BookProps} description - The description of the book.
   * @param {BookProps} pages - The number of pages in the book.
   */
  constructor({ id, title, authors, description, pages }: BookProps) {
    this.id = id ?? crypto.randomUUID()
    this.title = title
    this.authors = authors
    this.description = description
    this.pages = pages
  }

  /**
   * Generates the HTML element for the book's card.
   *
   * @return {HTMLDivElement} The generated card element.
   */
  get getElement(): HTMLDivElement {
    const cardElement = document.createElement('div')
    cardElement.id = this.id
    cardElement.classList.add('card')

    const titleElement = document.createElement('h3')
    titleElement.classList.add('card-title')
    titleElement.textContent = this.title
    cardElement.appendChild(titleElement)

    const subtitleElement = document.createElement('p')
    subtitleElement.classList.add('card-subtitle')
    subtitleElement.textContent = this.authors
    cardElement.appendChild(subtitleElement)

    const contentElement = document.createElement('p')
    contentElement.classList.add('card-content')
    contentElement.textContent = this.description
    cardElement.appendChild(contentElement)

    const footElement = document.createElement('p')
    footElement.classList.add('card-foot')

    const pageElement = document.createElement('span')
    pageElement.classList.add('line-clamp-1')
    pageElement.innerHTML = `Page(s): <span>${this.pages}</span>`
    footElement.appendChild(pageElement)

    const buttonElement = document.createElement('button')
    buttonElement.classList.add(
      'flex',
      'flex-shrink-0',
      'justify-center',
      'items-center',
      'gap-2',
      'h-[2.375rem]',
      'w-[2.375rem]',
      'text-sm',
      'font-semibold',
      'rounded-lg',
      'border',
      'border-transparent',
      'bg-red-500',
      'text-white',
      'hover:bg-red-600',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'dark:focus:outline-none',
      'dark:focus:ring-1',
      'dark:focus:ring-gray-600'
    )

    buttonElement.addEventListener('click', () => {
      removeBookFromLibrary(this.id)
    })

    const iconElement = document.createElement('iconify-icon')
    iconElement.setAttribute('icon', 'mdi:delete')
    buttonElement.appendChild(iconElement)

    footElement.appendChild(buttonElement)
    cardElement.appendChild(footElement)

    return cardElement
  }
}
