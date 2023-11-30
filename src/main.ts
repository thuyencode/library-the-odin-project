import 'iconify-icon'
import { newBookForm } from './lib/elements'
import { Book } from './lib/objects'
import { addBookToLibrary, closeModal, updateUI } from './lib/utils'

newBookForm!.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()

  const target = event.target as HTMLFormElement
  const formData = new FormData(target)

  const title = formData.get('book-title-input') as string
  const authors = formData.get('author-name-input') as string
  const description = formData.get('description-input') as string
  const pages = formData.get('pages-number-input') as string

  const book = new Book({
    title,
    authors,
    description,
    pages: Number.parseInt(pages)
  })

  addBookToLibrary(book)
  closeModal('#hs-new-book-modal')

  target.reset()
})

updateUI()
