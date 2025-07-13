import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionType } from "../enum/question-type.enum";
import { Quiz } from "./Quiz";
import { Answer } from "./Answer";
import { QuizAttemptAnswer } from "./QuizAttemptAnswer";


@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid'})
    quizId: string

    @Column()
    question: string

    @Column({nullable: true})
    description?: string

    @Column({
        type: "enum",
        enum: QuestionType,
        default: QuestionType.SINGLE_CHOICE
    })
    type: QuestionType

    @Column({nullable: true})
    explanation?: string

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz

    @OneToMany(() => Answer, (answer) => answer.question, {cascade: true})
    answers: Answer[]

    @OneToMany(() => QuizAttemptAnswer, (QuizAttemptAnswer) => QuizAttemptAnswer.quizAttempt)
    quizAttemptAnswers: QuizAttemptAnswer[]
}