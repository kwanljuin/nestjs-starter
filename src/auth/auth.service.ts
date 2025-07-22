import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

interface AuthInput {
  username: string;
  password: string;
}

interface SignInData {
  id: number;
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  user: SignInData;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResponse> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByUsername(input.username);

    if (user && user.password === input.password) {
      return { id: user.id, username: user.username };
    }

    // Return null if user not found or password does not match
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResponse> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }
}
