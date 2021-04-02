import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchMode: boolean = false;
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  
  previousKeyword: string = null;

  constructor(private productService: ProductService,
              private router: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(() => {
      this.listProducts();
    })
    this.listProducts();
  }

  listProducts() {
    //verifichiamo se il link ha una parola
    this.searchMode = this.router.snapshot.paramMap.has('keyword');
    // { path: 'search/:keyword', component: ProductListComponent } si riferisce a questo

    if(this.searchMode)
      this.handleSearchProducts();
    else
      this.handleListProducts();
  }

  handleSearchProducts(){
    const keyword: string = this.router.snapshot.paramMap.get('keyword');

    //se abbiamo una parola differente dalla precedente, imposta la prima pagina

    if(this.previousKeyword != keyword){
      this.pageNumber = 1;  
    }

    this.previousKeyword = keyword;

    this.productService.searchProductListPaginate(this.pageNumber-1,
                                                  this.pageSize,
                                                  keyword).subscribe(this.processResult());
  } 

  handleListProducts(){

    //verificare se il parametro id è disponibile
    const hasCategoryId: boolean = this.router.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //convertiamo da stringa a numero
      this.currentCategoryId = +this.router.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId)
      this.pageNumber = 1;

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    this.productService.getProductListPaginate(this.pageNumber - 1, 
                                      this.pageSize, 
                                      this.currentCategoryId).subscribe(
                                       this.processResult()
                                      );

  }


  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number){
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }


  //------ADD TO CART
  addToCart(product: Product){
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
