let basketElem = document.getElementById("shopping-basket"); // Container for the items inside the basket.
let checkoutMessageElem = document.getElementById("checkout-message"); // Container for checkout message.
let backToProductsElem = document.getElementById("back-to-products"); // Container for the link to go back to product page.

// Generates the items which are added in the basket.
function generateBasketItems() {
  if (basket.length !== 0) {  // If the length of the basket array is not 0, items inside the basket page are generated.
    return (basketElem.innerHTML = basket.map((x) => { // New array generated containing x and the new array displayed inside the basket container.
      let { id, quantity } = x; 
      let search = products.find((y) => y.id === id) || []; // Search an item with id in basket. Otherwise return an empty array if nothing found.
      return `
          <div class="basket-item">
            <img width="100" src=${search.image} alt="" />
            <div class="details">
              <p>${search.name}</p>
              <p class="cart-item-price">Price per item: ${search.price}:-</p>
            </div>
            <div class="buttons">
              <i onclick="decrementProductsInBasket(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${quantity}</div>
              <i onclick="incrementProductsInBasket(${id})" class="bi bi-plus-lg"></i>
              </div>
          </div>`;}).join(""));
  } else {  
    basketElem.innerHTML = ``; // If the length of basket array is 0, the element for the basket remains empty.
    backToProductsElem.innerHTML = `<a href="index.html">Back to products page</a>`; // Element which contains a link to go back to product page.
  }

}

function findItemInBasket(idToFind) {
  return basket.find((item) => item.id === idToFind);
}

// Function to increment the items in basket
function incrementProductsInBasket(id) {
  let selectedItem = id; 
  let foundItem = findItemInBasket(selectedItem.id);

  if (foundItem === undefined) { 
    basket.push({ // If no item with specific id found, item is added into basket.
      id: selectedItem.id,
      quantity: 1,
    });
  }
  else {
    foundItem.quantity += 1; // If item with specific id exists, increase quantity by 1.
  }

  generateBasketItems();
  localStorage.setItem("data", JSON.stringify(basket));

}
// Function for the decrement button in the basket. Works the same way as the increment function; however it also checks if quantity is equal to 0 and it that case, nothing happens.
function decrementProductsInBasket(id) {
  let selectedItem = id;
  let foundItem = findItemInBasket(selectedItem.id);

  if (foundItem === undefined)
    return;
  else if (foundItem.quantity === 0)
    return; // Nothing happens, meaning the quantity cannot be decreased once value of quantity is 0.
  else {
    foundItem.quantity -= 1;
  }

  basket = basket.filter((x) => x.quantity !== 0);
  generateBasketItems();
  localStorage.setItem("data", JSON.stringify(basket));

}

// Function which clears the basket.
function clearBasket() {
  basket = []; // Empty array to reset basket.
  generateBasketItems(); // Call the function for generating basket items to generate page without basket items.
  localStorage.setItem("data", JSON.stringify(basket)); // Data saved inside local storage.
  checkoutMessageElem.innerHTML = "";

}

// Function which calculates the total sum.
function totalAmount() {
  if (basket.length !== 0) { 
    let sum = basket.map((x) => { 
      let { quantity, id } = x; // Destructure the x to get the quantity and id of the object which is x.
      let search = products.find((y) => y.id === id) || []; // Search an item with id in basket. Otherwise return an empty array if nothing found.

      return quantity * search.price; // Returns the total sum of each product.
    }).reduce((x, y) => x + y, 0); // All objects inside the array are summarized to get the total sum of all products.

    
    checkoutMessageElem.innerHTML = `<h2>The total sum is ${sum}</h2>`; // Write out the total sum to the user inside the specified container.
  }
  else
    return; // Nothing happens if basket length is 0.
}


generateBasketItems();