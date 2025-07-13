import { Field, ObjectType } from "@nestjs/graphql";
import { Quiz } from "../entity/Quiz";

@ObjectType()
export class GetQuizResponse {

    @Field(() => Quiz)
    quiz: Quiz | null
}