import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { AuthModule } from './auth/auth.module';

// Request logging
const morganProvider = {
  provide: APP_INTERCEPTOR,
  useClass: MorganInterceptor('short', {
    stream: { write: (str) => console.log(str) },
  }),
};

// Response serialization
const serializationProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ClassSerializerInterceptor,
};

@Module({
  imports: [MorganModule, AuthModule],
  providers: [morganProvider, serializationProvider],
})
export class ApiModule {}
