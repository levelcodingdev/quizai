import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/User';
import { Quiz } from './entity/Quiz';
import { Question } from './entity/Question';
import { Answer } from './entity/Answer';
import { QuizResolver } from './quiz.resolver';
import { GeminiModule } from 'src/gemini/gemini.module';
import { QuizService } from './quiz.service';
import { QuizAttempt } from './entity/QuizAttempt';
import { QuizAttemptAnswer } from './entity/QuizAttemptAnswer';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Quiz,
            Question,
            Answer,
            QuizAttempt,
            QuizAttemptAnswer
        ]),
        GeminiModule,
    ],
    providers: [QuizResolver, QuizService]
})
export class QuizModule {}
