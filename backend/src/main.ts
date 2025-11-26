import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // DŮLEŽITÉ: Povolení CORS pro Next.js frontend na 3001
  app.enableCors({
    // V production by toto mělo být nahrazeno vaší doménou!
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Ujistíme se, že poslouchá na portu 3000 a na IP adrese 0.0.0.0, aby byl dostupný lokálně.
  await app.listen(3000, '0.0.0.0'); 
  
  // V logu uvidíš: [NestApplication] Nest application successfully started
}
bootstrap();