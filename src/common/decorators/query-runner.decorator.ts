import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const QR = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.queryRunner) {
      throw new InternalServerErrorException(
        'QueryRunner Decorator는 TransactionInterceptor를 적용해야 합니다.',
      );
    }

    return req.queryRunner;
  },
);
