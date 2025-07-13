import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionType } from "../enum/question-type.enum";
import { Quiz } from "./Quiz";
import { Question } from "./Question";
import { QuizAttemptAnswer } from "./QuizAttemptAnswer";


@Entity()
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid'})
    questionId: string

    @Column()
    answer: string

    @Column()
    isCorrect: boolean

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question

    @OneToMany(() => QuizAttemptAnswer, (QuizAttemptAnswer) => QuizAttemptAnswer.quizAttempt)
    quizAttemptAnswers: QuizAttemptAnswer[]
}