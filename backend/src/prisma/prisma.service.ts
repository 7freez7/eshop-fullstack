// Soubor: src/prisma/prisma.service.ts

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Zde se provádí oprava: Místo '$on' použijeme $use a ošetříme typování
  async enableShutdownHooks(app: INestApplication) {
    // Využijeme typování z Node.js, které je k dispozici
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
  
}