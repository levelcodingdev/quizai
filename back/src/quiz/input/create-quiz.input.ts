import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";


@InputType()
export class CreateQuizInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    prompt: string
}