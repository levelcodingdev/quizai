import { User } from "src/user/entity/User";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Quiz } from "./Quiz";
import { QuizAttemptAnswer } from "./QuizAttemptAnswer";


@Entity()
export class QuizAttempt {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid', nullable: true})
    userId?: string

    @Column({type: 'uuid'})
    quizId: string

    @Column({default: 0})
    questionsAnswered: number

    @Column({default: false})
    isCompleted: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @ManyToOne(() => User, (user) => user.quizAttempts, {nullable: true})
    @JoinColumn({name: 'userId'})
    user?: User

    @ManyToOne(() => Quiz, (quiz) => quiz.quizAttempts)
    @JoinColumn({name: 'quizId'})
    quiz: Quiz

    @OneToMany(() => QuizAttemptAnswer, (QuizAttemptAnswer) => QuizAttemptAnswer.quizAttempt)
    quizAttemptAnswers: QuizAttemptAnswer[]

    
}