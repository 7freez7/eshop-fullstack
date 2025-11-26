import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  // Tato metoda se spustí hned po inicializaci modulu
  async onModuleInit() {
    // Připojení k databázi
    await this.$connect();
  }

  // Zajistí, že se spojení uzavře, když se aplikace vypne.
  // Je to důležité pro čisté ukončení procesu.
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as any, async () => {
      await app.close();
    });
  }
}