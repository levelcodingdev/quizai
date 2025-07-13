import { Field, ObjectType } from "@nestjs/graphql";
import { QuizAttempt } from "../entity/QuizAttempt";

@ObjectType()
export class CreateQuizResponse {

    @Field(() => QuizAttempt)
    quizAttempt: QuizAttempt | null
}