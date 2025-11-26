// Soubor: src/products/products.controller.ts

import { 
  Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseIntPipe 
} from '@nestjs/common';
import { ProductsService } from './products.service'; // Import služby

import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'; // Import pro ochranu

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {} // Vložení služby

  // 1. READ (Veřejná cesta pro e-shop)
  @Get() // GET /products
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  
  // ----------------------------------------------------
  // ADMIN OPERACE - Chráněno pomocí JWT
  // ----------------------------------------------------
  
  // 2. CREATE
  @UseGuards(JwtAuthGuard) // Vyžaduje token
  @Post() // POST /products
  create(@Body() createProductDto: Product): Promise<Product> {
    // V reálu bys zde neměl přijímat celý typ 'Product', ale DTO (Data Transfer Object),
    // které by neobsahovalo např. ID. Pro zjednodušení použijeme typ Product.
    return this.productsService.create(createProductDto);
  }

  // 3. UPDATE
  @UseGuards(JwtAuthGuard) // Vyžaduje token
  @Put(':id') // PUT /products/:id
  update(
    @Param('id', ParseIntPipe) id: number, // Zajišťuje, že :id je číslo
    @Body() updateProductDto: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  // 4. DELETE
  @UseGuards(JwtAuthGuard) // Vyžaduje token
  @Delete(':id') // DELETE /products/:id
  remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.remove(id);
  }
}