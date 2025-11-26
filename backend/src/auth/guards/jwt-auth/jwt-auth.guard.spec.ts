// Soubor: src/auth/guards/jwt-auth.guard.spec.ts

import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';

// Popisuje testovací blok pro JwtAuthGuard
describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  // Před každým testem inicializujeme Guard
  beforeEach(async () => {
    // Vytvoření testovacího modulu
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  // Základní test, který ověřuje, jestli byl Guard správně definován a vytvořen
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  
  // Test, který simuluje volání Guardu (pokročilejší)
  // V reálném testu bys zde simuloval, zda 'canActivate' vrátí true/false
  // it('should return true for a valid request', () => {
  //   const mockContext: ExecutionContext = {} as any; // Mock ExecutionContext
  //   const canActivate = guard.canActivate(mockContext);
  //   expect(canActivate).toBe(true);
  // });
});