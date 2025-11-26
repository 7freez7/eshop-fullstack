import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importujeme Prisma

@Module({
  imports: [PrismaModule], // Přidáme Prisma
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

// Soubor: src/products/products.service.ts