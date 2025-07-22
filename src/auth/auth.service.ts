import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateAccessToken(user: User): string {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET!,
      expiresIn: '7d',
    });
  }
  private generateRefreshToken(user: User): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_JWT_SECRET!,
      expiresIn: '14d',
    });
  }

  private generateTokens(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  async signup(signUpDto: SignUpDto) {
    const isExistingUser = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (isExistingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await this.hashedPassword(signUpDto.password);
    const newUser = this.userRepository.create({
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      email: signUpDto.email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    const savedUser = await this.userRepository.save(newUser);

    const { password, ...result } = savedUser;

    return {
      message: 'User created successfully! Pls login to continue',
      user: result,
    };
  }

  async adminSignup(signUpDto: SignUpDto) {
    const isExistingUser = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (isExistingUser) {
      throw new ConflictException('Admin already exists');
    }
    const hashedPassword = await this.hashedPassword(signUpDto.password);
    const newAdmin = this.userRepository.create({
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      email: signUpDto.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    const savedAdmin = await this.userRepository.save(newAdmin);

    const { password, ...result } = savedAdmin;

    return {
      message: 'Admin created successfully! Pls login to continue',
      admin: result,
    };
  }

  async signin(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email: signInDto.email },
    });

    if (
      !user ||
      !(await this.comparePassword(signInDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //generate a JWT token here
    const tokens = this.generateTokens(user);

    const { password: _, ...result } = user;

    return {
      message: 'Login successful',
      tokens,
      user: result,
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.REFRESH_JWT_SECRET!,
      });
      const user = await this.userRepository.findOne({
        where: { id: decoded.sub },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this.generateAccessToken(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  //get current user by id
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, ...result } = user;

    return result;
  }
}
