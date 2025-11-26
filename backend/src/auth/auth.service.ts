import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client'; 

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  /**
   * Ověří uživatele podle e-mailu a hesla.
   * Vytvoří výchozího admina, pokud neexistuje (pouze pro vývoj).
   */
  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    // *** Automatické vytvoření prvního admina (pouze pro dev) ***
    if (email === 'admin@eshop.cz' && (await this.prisma.user.count()) === 0) {
      const hashedPassword = await bcrypt.hash('heslo123', 10);
      await this.prisma.user.create({
        data: { email: 'admin@eshop.cz', password: hashedPassword, role: 'ADMIN' },
      });
    }

    // Vyhledání uživatele
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(pass, user.password))) {
      // V případě úspěchu vrátíme uživatele bez hesla
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generuje JWT token pro přihlášeného uživatele.
   */
  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}