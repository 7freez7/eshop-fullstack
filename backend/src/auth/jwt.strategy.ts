// Soubor: src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { PrismaService } from '../prisma/prisma.service';

// Definice rozhraní pro Payload tokenu
interface JwtPayload {
  sub: number; // ID uživatele
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      // Odkud se má token extrahovat (z Hlavičky 'Authorization: Bearer <token>')
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, // Neignorovat expiraci tokenu
      secretOrKey: jwtConstants.secret, // Použít náš tajný klíč
    });
  }

  // Tato metoda se spustí po dekódování tokenu
  async validate(payload: JwtPayload) {
    // Najdeme uživatele podle ID v databázi, abychom potvrdili jeho existenci
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Token je neplatný.');
    }
    
    // Vrátíme objekt, který se pak uloží do req.user
    return { id: user.id, email: user.email, role: user.role };
  }
}