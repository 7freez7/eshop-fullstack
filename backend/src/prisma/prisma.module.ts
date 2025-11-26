import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  // PrismaService je "provider" (poskytovatel) v tomto modulu
  providers: [PrismaService], 
  // Zpřístupníme PrismaService ostatním modulům, které importují PrismaModule
  exports: [PrismaService], 
})
export class PrismaModule {}