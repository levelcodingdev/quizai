import { Quiz } from "src/quiz/entity/Quiz";
import { QuizAttempt } from "src/quiz/entity/QuizAttempt";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @OneToMany(() => Quiz, (quiz) => quiz.user)
    quizzes: Quiz[]

    @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
    quizAttempts: QuizAttempt[]
}