import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'

export const IsUserAdmin = createParamDecorator<undefined>(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const isUserAdmin = request.userRole

    if (!isUserAdmin) {
      throw new UnauthorizedException()
    }

    return isUserAdmin
  },
)
