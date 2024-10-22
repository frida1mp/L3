import { BookingManager } from 'booking-manager-module'
import { LocalStorageAdapter } from './localStorage.js'

const localStorage = new LocalStorageAdapter()

const bookingManager = new BookingManager(localStorage)

// Testing: Add a new booking
const newProduct = {
  name: 'Test',
  description: 'first product',
  price: 100
}
console.log('prod', newProduct)
console.log(await bookingManager.addProduct(newProduct))

console.log(bookingManager.getAllProducts())
