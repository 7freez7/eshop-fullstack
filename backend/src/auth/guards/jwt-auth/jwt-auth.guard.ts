// Soubor: src/auth/guards/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// "jwt" odkazuje na název strategie, kterou jsme definovali v JwtStrategy
export class JwtAuthGuard extends AuthGuard('jwt') {}