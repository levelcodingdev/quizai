import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizAttempt } from "./QuizAttempt";
import { Question } from "./Question";
import { Answer } from "./Answer";


@Entity('quiz_attempt_answers')
export class QuizAttemptAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid'})
    quizAttemptId: string

    @Column({type: 'uuid'})
    questionId: string

    @Column({type: 'uuid'})
    answerId: string

    @Column({type: 'boolean', nullable: false})
    isCorrect: boolean

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => QuizAttempt, (quizAttempt) => quizAttempt.quizAttemptAnswers, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'quizAttemptId'})
    quizAttempt: QuizAttempt

    @ManyToOne(() => Question, (question) => question.quizAttemptAnswers)
    @JoinColumn({name: 'questionId'})
    question: QuizAttempt


    @ManyToOne(() => Answer, (answer) => answer.quizAttemptAnswers)
    @JoinColumn({name: 'answerId'})
    answer: QuizAttempt
}