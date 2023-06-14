 import { menuArray } from './data.js'
 import { v4 as uuid4 } from 'https://jspm.dev/uuid';
 let orderArray = []
 let orderTotal = .00
 let orderDiscount = .00
 let totalPrice = .00
 let firstNameArray = []
 let userRatingArray = []
 let addbtn = document.getElementsByName("addButton")
 let beerTotal = 0
 let foodTotal = 0 
document.addEventListener('click', function(e){
    if(e.target.dataset.menuItem){
        handleAddItemClick(e.target.dataset.menuItem)
        handleSpeedClick(e.target.dataset.menuItem)
         handleOrderSectionEl()
    } else if(e.target.id === 'order-btn'){
        handleCompleteOrderBtn()
        
    } else if(e.target.dataset.removeItem){
        handleRemoveItemClick(e.target.dataset.removeItem)
        handleOrderSectionEl()
    } else if(e.target.id === 'pay-btn-el') {
        handlePayBtnClick()
        
    } else if(e.target.id === `1-star` || e.target.id === `2-stars` || e.target.id === `3-stars` || e.target.id === `4-stars` || e.target.id === `5-stars`){
        starFunction(e.target.value)
    } 
})

// (--- To stop user speed clicking the add button ---)

function handleSpeedClick(e){
    addbtn.disabled = true
    render()
}

function handleOrderSectionEl(){
    
   document.getElementById(`order-section-el`).classList.toggle('hidden2');
} 



function handleAddItemClick(menuId){
    const order = menuArray.find((order) => order.id === menuId);
    
    if(orderArray.length == 0){
        orderArray.push({
            name: order.name,
            price: order.price,
            id: menuId,
            quantity: 1,
        })
       orderTotal += order.price ;
        
    }else if(orderArray.length >= 1 ){
        orderTotal += order.price ;
        orderArray.forEach(function(item){ 
            const orderObjectArray = orderArray.filter(function(orderItem){
            return orderItem.id === item.id
            }) 
                              
            if(order.id == item.id) {
                        item.quantity ++
                        return
            }
             
            if(orderObjectArray.id != item.id  && orderArray.length < 2) {
                
                            orderArray.push({
                                name: order.name,
                                price: order.price,
                                id: order.id,
                                quantity: 1,
                            }) 
                            return
                              
            }  if( orderArray[1].id != order.id && orderArray[0].id != order.id && orderArray.length < 3) {
                   
                        orderArray.push({
                                name: order.name,
                                price: order.price,
                                id: order.id,
                                quantity: 1,
                            })
                     
             } //<--- end of (else if) statement ---
            
        }) //<--- endo of (forEach) menthod ---
    } //<--- end of if(orderArray.length) statement ---
     
    render()
     
    calculateDiscount()
}   
    
 function calculateDiscount(){
     orderDiscount = 0
    let  orderDealBeerObject = orderArray.filter(function(orderItem){
                return orderItem.id === '6b940499-ad3b-475f-adbe-5103f9438076'})[0];
    let orderDealPizzaObject = orderArray.filter(function(orderItem){
                return orderItem.id === 'f4479514-d429-429a-a679-0d3ca550f610'})[0];
    let orderDealHamburgerObject = orderArray.filter(function(orderItem){
                return orderItem.id === 'b14059df-f04f-4e15-9e1a-7fe630021b35'})[0];
                
       if(orderDealBeerObject){ 
            let beerQuantity = orderDealBeerObject.quantity
            
            if(orderDealPizzaObject && orderDealHamburgerObject){
                  orderDiscount = 0
                let pizzaQuantity = orderDealPizzaObject.quantity
                let hamburgerQuantity = orderDealHamburgerObject.quantity
                let totalFoodItemsQuantity = pizzaQuantity + hamburgerQuantity
                
                if(beerQuantity < totalFoodItemsQuantity){
                    orderDiscount = beerQuantity * 4
                    
                }else if(beerQuantity > totalFoodItemsQuantity){
                    orderDiscount = totalFoodItemsQuantity * 4
                    
                }else {orderDiscount = beerQuantity * 4}
                return orderDiscount
                
            }else if(orderDealPizzaObject){
                orderDiscount = 0
                let pizzaQuantity = orderDealPizzaObject.quantity
                
                if(beerQuantity < pizzaQuantity){
                    orderDiscount = beerQuantity * 4
                     
                }else if(beerQuantity > pizzaQuantity){
                    orderDiscount = pizzaQuantity * 4
                    
                }else {orderDiscount = beerQuantity * 4}
                return
                
            }else if(orderDealHamburgerObject){
                orderDiscount = 0
                let hamburgerQuantity = orderDealHamburgerObject.quantity
                
                if(beerQuantity < hamburgerQuantity){
                 return   orderDiscount = beerQuantity * 4
                     
                }else if(beerQuantity > hamburgerQuantity){
                    orderDiscount = hamburgerQuantity * 4
                    
                }else {orderDiscount = beerQuantity * 4}
                return
            } // <--- end of else/if(orderDealHamburgerObject)     
       } // <--- end of if(orderDealBeerObject)  
     
      render()            
 }
 
function handleRemoveItemClick(menuId){
    const targetOrderObj = orderArray.filter(function(menu){
       return menu.id === menuId
    })[0]

if(targetOrderObj.quantity > 1){
    targetOrderObj.quantity --
    orderTotal -= targetOrderObj.price 
} else{
    orderTotal -= targetOrderObj.price * targetOrderObj.quantity; 
    
    orderArray.splice(orderArray.findIndex(e => e.id === menuId),1);}
    calculateDiscount()
    render()
    if(orderArray.length < 1){
     handleOrderSectionEl()
    }
}

function handleCompleteOrderBtn(){
    if(orderArray.length > 0){
        document.getElementById(`payment-modal`).classList.toggle('hidden')
        document.getElementById(`order-section-el`).classList.add('hidden');
    } else {
        return
    }
    userRatingArray = []
}

function handlePayBtnClick(){
    document.getElementById(`payment-modal`).classList.toggle('hidden');
    
    let cardNameEl = document.getElementById(`payment-name-el`)
    let cardNumberEl = document.getElementById('card-number-el')
    let cvvEl = document.getElementById('cvv-el')
    let fullName = cardNameEl.value
    let firstNameVar = fullName.split(' ').slice(0, -1).join(' ');
   
    if(!cardNameEl.value || !cardNumberEl.value || !cvvEl.value){
       alert('Please enter card information')
       handleCompleteOrderBtn()
       return
    } else { firstNameArray.push(firstNameVar)
    }
    
    cardNameEl = ''
    cardNumberEl = ''
    cvvEl = ''
    orderArray = []
    orderTotal = 0
     
    render()
    document.getElementById(`order-section-el`).classList.add('hidden');
    document.getElementById(`thank-you-modal-el`).classList.toggle('hidden');
    firstNameArray =[]
    window.scroll(0,600);
}

function getFeedHtml(){
    let orderFeedHtml = `` 
    let menufeedHtml = ``
    let nameForFeedHtml = ``
    let userRatingHtml = ``
   
   totalPrice = orderTotal - orderDiscount
    menuArray.forEach(function(menu){
        let ingredientsHtml = ``
        menu.ingredients.forEach(function(ingr){
            ingredientsHtml += `
            <p> ${ingr} </p>`
        })
        menufeedHtml += `
            <div class="menu-container" id="menu-item-container">
                <div class="menu-inner">
                    <img src="${menu.img}">
                    <div class="menu-info">
                        <h3>${menu.name}</h3>
                        <div class="ingredients-el">
                        ${ingredientsHtml}
                        </div>
                        <h4>$ ${menu.price}</h4>
                    </div>
                    <button name="addButton" id="add-btn"class="add-item-btn" data-menu-item ="${menu.id}">+</button>
                </div> 
                <div class="divider"></div>
            </div>
            
         `
        })
    let itemTotal = ''
    orderArray.forEach(function(order){
        itemTotal = order.price * order.quantity
         orderFeedHtml += `
                    <div class="order-line">
                        <div class="order-item-card-el">
                            <h3>${order.name}</h3>
                            <h4 class="order-multiplier">x${order.quantity}</h4>
                            <button class="remove-btn" data-remove-item = "${order.id}">remove</button>
                        </div>
                        <h4 class="order-cost">$${itemTotal}</h4>
                    </div>
         `
     })
     
     if(firstNameArray){ 
        firstNameArray.forEach(function(name){
        
        nameForFeedHtml += `
        <h6>Thanks, ${name}! Your order is on its way!</h6>
        `
    })
    
   }
   
   if(userRatingArray){
       userRatingArray.forEach(function(ratings){
           userRatingHtml += `
           <h4 class="user-rating">( ${ratings.reaction}You gave us ${ratings.rating} out of 5 stars )</h4>
           `
       })
   }
    
     let feedHtml = `
        <div class="payment-modal hidden"  id = "payment-modal">
            <h5>Enter card details</h5>
            <input type="text" placeholder="Enter your name" id="payment-name-el">
            <input type="number" placeholder="Enter card number" id="card-number-el">
            <input class="cvv-field" type="number" placeholder="Enter CVV" id="cvv-el">
            <div class="star-rating">
                <input type="radio" id="5-stars" name="rating" value="5" />
                <label for="5-stars" class="star">&#9733;</label>
                <input type="radio" id="4-stars" name="rating" value="4" />
                <label for="4-stars" class="star">&#9733;</label>
                <input type="radio" id="3-stars" name="rating" value="3" />
                <label for="3-stars" class="star">&#9733;</label>
                <input type="radio" id="2-stars" name="rating" value="2" />
                <label for="2-stars" class="star">&#9733;</label>
                <input type="radio" id="1-star" name="rating" value="1" />
                <label for="1-star" class="star">&#9733;</label>
            </div>
            <p class="rating-text" id="one" ">Please rate how we did.</p>
            <button class="pay-btn" id="pay-btn-el">Pay</button>
        </div>
        
        <section class="menu-section" id="menu-section">
            ${menufeedHtml}
             
        </section>
        
        <section class="order-section">
            <div class"order-section-inner" id="order-section-inner-el">
                <div class="thank-you-modal hidden " id="thank-you-modal-el">
                     ${nameForFeedHtml}
                     ${userRatingHtml}
                </div>
                <div class="order-section-el hidden2" id="order-section-el">
                    <div class="order-header-el" >
                        <h3 class="order-header">Your order</h3>
                        <h4 class="order-deal" id="order-header-el">( add a beer to any food item for discount )</h4>
                    </div>
                    <div class="order-container" id="order-container">
                        <div class="order-inner" id="order-inner">
                            ${orderFeedHtml}
                            <div class="order-divider"></div>
                            <div class="discount-container">
                                <div class="order-total-line">
                                    <h3 class="total-text">Order total:</h3>
                                    <h4 class="total-cost">$${orderTotal}</h3>
                                </div>
                                <div class="discount-el " id="discount-el">
                                    <div class="discount-line">
                                        <h4 class="discount-text">Meal deal discount:</h4>
                                        <h4 class="discount-total">-$${orderDiscount}</h3>
                                    </div>
                                    <div class="total-divider"></div>
                                </div>
                            </div>
                            <div class="total-line">
                                <h3 class="total-text">Total price:</h3>
                                <h4 class="total-cost">$${totalPrice}</h3>
                            </div>
                        </div>
                    </div>
                    <button class="order-btn" id="order-btn">Complete order</button>
                </div>
            </div>
        </section>`
    
    return feedHtml;
    render()
 }
 
function render(){
     document.getElementById('feed-el').innerHTML = getFeedHtml()
 }
 
 function starFunction(e) {
    userRatingArray=[]
   if(e == 5){ 
     userRatingArray.unshift({
            rating: e,
            reaction: "Wow! "
            })
    }else if(e == 4){
       userRatingArray.unshift({
            rating: e,
            reaction: "Great! "
            })  
    }else if(e == 3){
       userRatingArray.unshift({
            rating: e,
            reaction: "Thanks, "
            })  
    }else if(e == 2){
       userRatingArray.unshift({
            rating: e,
            reaction: "Oops, "
            })  
    }else if(e == 1){
       userRatingArray.unshift({
            rating: e,
            reaction: "Sorry, let us try again, "
            })  
     }
    
}
 
 render()       
 