import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersRepository } from 'src/shared/database/repositories/users.repositories'
import { compare, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { SigninDto } from './dto/signin'
import { SignupDto } from './dto/signup'

enum UserRoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto

    const user = await this.usersRepo.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const isPasswordValid = await compare(password, user.hashedPassword)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = await this.generateAccessToken({
      userId: user.id,
      role: user.role as UserRoleType,
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: accessToken,
    }
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    })

    if (emailTaken) {
      throw new ConflictException('This email is already in use.')
    }

    const hashedPassword = await hash(password, 10)

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    const accessToken = await this.generateAccessToken({
      userId: user.id,
      role: user.role as UserRoleType,
    })

    return { access_token: accessToken }
  }

  private generateAccessToken({
    userId,
    role,
  }: {
    userId: string
    role: UserRoleType
  }) {
    return this.jwtService.signAsync({ sub: userId, role })
  }
}
