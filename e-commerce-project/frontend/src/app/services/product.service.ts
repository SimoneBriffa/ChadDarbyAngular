import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'  //STANDARD: restituisce 20 oggetti soltanto
  //private baseUrl = 'http://localhost:8080/api/products?size=100'  ne restituisce 100

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private http: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductListPaginate(page: number, 
                    pageSize: number,
                    categoryId: number): Observable<GetResponseProducts>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                      + `&page=${page}&size=${pageSize}`;

    return this.http.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]>{

    return this.http.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
    
  }

  searchProductListPaginate(page: number, 
                            pageSize: number,
                            keyword: string): Observable<GetResponseProducts>{

      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
                        + `&page=${page}&size=${pageSize}`;

      return this.http.get<GetResponseProducts>(searchUrl);
    }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.http.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProduct(productId: number): Observable<Product> {

    const productUrl = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(productUrl);
  }


}


interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
  page: {
    size:number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}


