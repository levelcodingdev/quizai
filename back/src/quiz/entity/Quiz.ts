import { User } from "src/user/entity/User";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./Question";
import { QuizAttempt } from "./QuizAttempt";


@Entity()
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid', nullable: true})
    userId?: string

    @Column()
    title: string

    @Column()
    promptText: string

    @Column()
    prompt: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @ManyToOne(() => User, (user) => user.quizzes, {nullable: true})
    @JoinColumn({name: 'userId'})
    user?: User

    @OneToMany(() => Question, (question) => question.quiz, {cascade: true})
    questions: Question[]

    @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz, {cascade: true})
    quizAttempts: QuizAttempt[]
}