import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Quiz } from 'src/quiz/entity/Quiz';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Quiz])
    ],
})
export class UserModule {}
