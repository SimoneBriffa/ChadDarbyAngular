import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  storage: Storage = localStorage; //serve a non perdere i dati al ricaricamento della pagina

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0); //0 è il valore iniziale
  //Subject è una sottoclasse di Observable. Si usa per pubblicare eventi all'interno del codice
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if(data != null)
      this.cartItems = data;

    this.computeCartTotals();

   }

  addToCart(cartItem: CartItem){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
   
    //accertarsi che l'articolo non sia già nel carrello

    if(this.cartItems.length > 0){ //cioè se ci sono già articoli nel carrello...
      existingCartItem = this.cartItems.find(
                  tempCartItem => tempCartItem.id === cartItem.id);
        alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart) //incrementa la quantità
      existingCartItem.quantity++;
    else //altrimenti aggiungilo al carrello
      this.cartItems.push(cartItem);


      //calcola il prezzo totale

      this.computeCartTotals();

  }


  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }

    //pubblica i nuovi valori
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.persistCartItems();

  }

  decrementQuantity(cartItem: CartItem) {
    
    cartItem.quantity--;
    if(cartItem.quantity === 0)
      this.remove(cartItem);
    else
      this.computeCartTotals();

  }

  remove(cartItem: CartItem){
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === cartItem.id);

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1); //rimuove dall'array
      this.computeCartTotals();
    }
  }

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


}
