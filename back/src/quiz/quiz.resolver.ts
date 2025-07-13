import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuizInput } from './input/create-quiz.input';
import { QuizService } from './quiz.service';
import { CreateQuizResponse } from './models/create-quiz-response';
import { GetQuizResponse } from './models/get-quiz-response';
import { SubmitQuizAnswerInput } from './input/submit-quiz-answer.input';

@Resolver()
export class QuizResolver {
    constructor(private quizService: QuizService) {}

    @Query(() => GetQuizResponse)
    async getQuiz(@Args('quizAttemptId', {type: () => ID}) quizAttemptId: string) {
        return await this.quizService.getQuiz(quizAttemptId)
    }

    @Query(() => GetQuizResponse)
    async getQuizResults(@Args('quizAttemptId', {type: () => ID}) quizAttemptId: string) {
        return await this.quizService.getQuizResults(quizAttemptId)
    }

    @Mutation(() => CreateQuizResponse)
    async createQuiz(@Args('input') input: CreateQuizInput) {
        return await this.quizService.generateQuiz(input);
    }

    @Mutation(() => SubmitQuizAnswerInput)
    async submitQuizAnswer(@Args('input') input: SubmitQuizAnswerInput) {
        return await this.quizService.submitQuizAnswer(input)
    }

    @Mutation(() => Boolean)
    async submitQuiz(
        @Args('quizAttemptId', {type: () => ID!})  quizAttemptId: string
    ) {
        return await this.quizService.submitQuiz(quizAttemptId);
    }
}
