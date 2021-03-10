import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  products: Product[];
  errorMessage: string;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });
  }

}
