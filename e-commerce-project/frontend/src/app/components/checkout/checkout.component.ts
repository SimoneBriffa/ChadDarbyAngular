import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { Address } from 'src/app/common/address';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  //N.B. importa ReactiveFormsModule negli imports di app.module
  checkOutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkOutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                    [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', 
                    [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        email: new FormControl('',
                              [Validators.required, 
                               Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', 
              [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('', 
              [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', 
              [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', 
              [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('', 
              [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', 
              [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cartType: new FormControl('', 
        [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        nameOnCard: new FormControl('', 
        [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear:['']
      })
    });

    //popola i mesi della carta di credito

    const startMonth: number = new Date().getMonth() + 1;

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

      //nazioni

      this.luv2ShopFormService.getCountries().subscribe(
        data => { 
          this.countries = data
        });

  }

  get firstName(){
    return this.checkOutFormGroup.get('customer.firstName');
  }

  get lastName(){
    return this.checkOutFormGroup.get('customer.lastName');
  }

  get email(){
    return this.checkOutFormGroup.get('customer.email');
  }
  //--------------------------------
  get billingAddressStreet(){
    return this.checkOutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity(){
    return this.checkOutFormGroup.get('billingAddress.city');
  }

  get billingAddressState(){
    return this.checkOutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode(){
    return this.checkOutFormGroup.get('billingAddress.zipCode');
  }

  get billingAddressCountry(){
    return this.checkOutFormGroup.get('billingAddress.country');
  }
//------------------------------------
get shippingAddressStreet(){
  return this.checkOutFormGroup.get('shippingAddress.street');
}

get shippingAddressCity(){
  return this.checkOutFormGroup.get('shippingAddress.city');
}

get shippingAddressState(){
  return this.checkOutFormGroup.get('shippingAddress.state');
}

get shippingAddressZipCode(){
  return this.checkOutFormGroup.get('shippingAddress.zipCode');
}

get shippingAddressCountry(){
  return this.checkOutFormGroup.get('shippingAddress.country');
}
//------------------------------------
get creditCardType(){
  return this.checkOutFormGroup.get('creditCard.cartType');
}
get creditCardNameOnCard(){
  return this.checkOutFormGroup.get('creditCard.nameOnCard');
}
get creditCardNumber(){
  return this.checkOutFormGroup.get('creditCard.cardNumber');
}
get creditCardSecurityCode(){
  return this.checkOutFormGroup.get('creditCard.securityCode');
}
//--------------------------------------
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkOutFormGroup.controls.billingAddress
                .setValue(this.checkOutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkOutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkOutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
    
  }

  getStates(formGroupName: string){
    const formGroup = this.checkOutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress')
          this.shippingAddressStates = data;
        else
          this.billingAddressStates = data;

          //di default seleziona il primo elemento
          formGroup.get('state').setValue(data[0]);
      }

    );
  }

  reviewCartDetails(){
    /*Questo metodo è utile alla corretta impostazione del riepilogo dell'ordine nel checkout;
    Utilizziamo BehaviourSubject che ha la particolarità di tenere in considerazione solo
    dell'ultimo cambiamento di un determinato oggetto.
    Un esempio che la documentazione fa per rendere meglio questo concetto è la risposta che si da
    alla domanda "Quanti anni hai?"; la risposta tiene conto solo dell'ultimo anno compiuto, non
    di tutti quelli compiuti prima */

    this.cartService.totalQuantity.subscribe(
      response => this.totalQuantity = response
    );

      this.cartService.totalPrice.subscribe(
        response => this.totalPrice = response
      );

  }

  onSubmit(){
    
    if(this.checkOutFormGroup.invalid){
      this.checkOutFormGroup.markAllAsTouched();
      return;
    }  

    //SET UP ORDER
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;
    /*approccio "tradizionale"

    let orderItems: OrderItem[] = [];
    for(let i=0; i<cartItems.length; i++){
      orderItems[i] = new OrderItem(cartItems[i]); 
    } */

    //approccio veloce

    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    let purchase = new Purchase();

    purchase.customer = this.checkOutFormGroup.controls['customer'].value;
   
    purchase.shippingAddress = this.checkOutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;


    purchase.billingAddress = this.checkOutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    //populate purchase
    purchase.order = order;
    purchase.orderItems = orderItems;

    //call rest API

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCart();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
      //è un modo alternativo di usare la subscribe
    });

  }

  resetCart(){
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkOutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }

}
