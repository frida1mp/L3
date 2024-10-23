import { BookingManager } from 'booking-manager-module'
import { LocalStorageAdapter } from './localStorage.js'

export class bookingManager {
  constructor (booking) {
    this.localStorage = new LocalStorageAdapter()
    this.bookingManager = new BookingManager(localStorage)

  }



console.log('prod', newProduct)
console.log(await bookingManager.addProduct(newProduct))

console.log(bookingManager.getAllProducts())
}