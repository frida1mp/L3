/**
 * The booking-form web component module.
 *
 * @author Frida Pedersén <fp222ni@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .container {
      font-size: 1.2em;
      color:black;
      padding: 1em;
      margin: 1em;
      border: 2px solid black;
    }
    .inputField {
      margin: 2px;
    }
  </style>

  <div  class="container">
  <label for="nickname">Nickname:</label>
  <input type="text" class="nickname">
  <button id="startButton">Start</button>
  </div>
`

customElements.define('booking-form',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * The nickname.
     *
     * @type {string}
     */
    #nickname = 'unknown'

    /**
     * The button to press after inputting nickname.
     *
     * @type {HTMLElement}
     */
    #button

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the nickname element in the shadow root.
      this.#nickname = this.shadowRoot.querySelector('.nickname')
      this.#button = this.shadowRoot.querySelector('#startButton')
    }

    /**
     * Handles the "Start" button click event.
     */
    buttonClicked () {
      const enteredNickname = this.#nickname.value
      if (enteredNickname.trim() !== '') {
        this.dispatchEvent(new CustomEvent('nicknameEntered', { detail: enteredNickname }))
        this.setAttribute('nickname', enteredNickname)
      } else {
        alert('Please enter nickname')
      }
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['nickname']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add keydown event listener to the input field
      this.#nickname.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.buttonClicked()
        }
      })

      // Add click event listener to the button
      this.#button.addEventListener('click', (event) => this.buttonClicked())
      this.#nickname.value = this.getAttribute('nickname') || ''
    }

    /** Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`)
      if (name === 'nickname' && newValue !== oldValue && this.#nickname.value !== newValue) {
        this.#nickname.value = newValue
      }
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#button.removeEventListener('click', this.buttonClicked)
      this.#nickname.removeEventListener('keydown', this.handleKeyDown)
    }
  }
)

