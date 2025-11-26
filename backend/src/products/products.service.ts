// Soubor: src/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Vytvoření produktu
  async create(data: Product): Promise<Product> {
    // Zde bys v reálu měl logiku pro generování slug (např. ze jména)
    // a kontrolu, zda slug není duplicitní.
    return this.prisma.product.create({ data });
  }

  // Získání všech produktů (pro e-shop i admin)
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  // Získání jednoho produktu
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Produkt s ID ${id} nenalezen`);
    }
    return product;
  }

  // Aktualizace produktu
  async update(id: number, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // Odstranění produktu
  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}