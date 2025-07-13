import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsString } from "class-validator";


@InputType()
export class SubmitQuizAnswerInput {
    @Field()
    @IsString()
    quizId: string

    @Field()
    @IsString()
    quizAttemptId: string

    @Field()
    @IsString()
    questionId: string

    @Field()
    @IsArray()
    answerIds: [string]
}