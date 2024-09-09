import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService], // Export the service to make it available to other modules
})
export class UserModule {}
