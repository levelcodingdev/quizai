import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { CreateQuizInput } from './input/create-quiz.input';
import { EntityManager, In } from 'typeorm';
import { Quiz } from './entity/Quiz';
import { Question } from './entity/Question';
import { QuestionType } from './enum/question-type.enum';
import { Answer } from './entity/Answer';
import { QuizAttempt } from './entity/QuizAttempt';
import { SubmitQuizAnswerInput } from './input/submit-quiz-answer.input';
import { QuizAttemptAnswer } from './entity/QuizAttemptAnswer';

@Injectable()
export class QuizService {
    constructor(
        private readonly entityManager: EntityManager,
        private geminiService: GeminiService
    ) {}

    async getQuiz(quizAttemptId: string) {
        const quiz = await this.entityManager
            .getRepository(Quiz)
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.questions', 'questions')
            .leftJoinAndSelect('quiz.quizAttempts', 'quizAttempts')
            .leftJoinAndSelect('quizAttempts.quizAttemptAnswers', 'quizAttemptAnswers')
            .leftJoin('questions.answers', 'answers')
            .addSelect([
                'answers.id',
                'answers.answer'
            ])
            .addSelect([
                'quizAttemptAnswers.id',
                'quizAttemptAnswers.quizAttemptId',
                'quizAttemptAnswers.questionId',
                'quizAttemptAnswers.answerId',
            ])
            .where('quizAttempts.id = :quizAttemptId', {quizAttemptId})
            .getOne();

        return {quiz}
    }

    async getQuizResults(quizAttemptId: string) {
        const quiz = await this.entityManager
            .getRepository(Quiz)
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.questions', 'questions')
            .leftJoinAndSelect('questions.answers', 'answers')
            .leftJoinAndSelect('quiz.quizAttempts', 'quizAttempts')
            .leftJoinAndSelect('quizAttempts.quizAttemptAnswers', 'quizAttemptAnswers')
            .where('quizAttempts.id = :quizAttemptId', {quizAttemptId})
            .getOne();

        return {quiz}
    }

    async generateQuiz(input: CreateQuizInput) {
        try {
           const { data: quizData, prompt }  = await this.geminiService.generateQuizData(input)

           const quizAttempt = await this.entityManager.transaction(async (transactionalEntityManager) => {
                const quiz = new Quiz();
                quiz.title = quizData.quiz;
                quiz.prompt = prompt;
                quiz.promptText = input.prompt;

                quiz.questions = quizData.questions.map((questionData) => {
                    const question = new Question();
                    question.question = questionData.question;
                    question.type = QuestionType.SINGLE_CHOICE;
                    question.explanation = questionData.explanation;
                    question.description = questionData.description;

                    question.answers = questionData.answers.map((answerData) => {
                        const answer = new Answer()
                        answer.answer = answerData.answer;
                        answer.isCorrect = answerData.isCorrect;

                        return answer;
                    })

                    return question;
                })

                const quizAttempt = new QuizAttempt();
                quiz.quizAttempts = [quizAttempt];

                await transactionalEntityManager.save(Quiz, quiz);

                return transactionalEntityManager.findOne(QuizAttempt, {
                    where: {
                        quizId: quiz.id
                    }
                })
           })

           return {quizAttempt}

        } catch (e) {
            return {quizAttempt: null}
        }
    }

    async submitQuizAnswer(input: SubmitQuizAnswerInput) {
        try {
            const [quizAttempt, question, answersFound] = await Promise.all([
                this.entityManager.getRepository(QuizAttempt).findOne({
                    where: {
                        id: input.quizAttemptId,
                        quizId: input.quizId,
                    }
                }),
                this.entityManager.getRepository(Question).findOne({
                    where: {
                        id: input.questionId,
                        quizId: input.quizId,
                    }
                }),
                this.entityManager.getRepository(Answer).find({
                    where: {
                        id: In(input.answerIds),
                        questionId: input.questionId
                    }
                })
            ])

            if(!quizAttempt || !question || answersFound.length != input.answerIds.length) {
                return false;
            }

            if (question.type == QuestionType.SINGLE_CHOICE && input.answerIds.length > 1) {
                return false;
            }

            await this.entityManager.getRepository(QuizAttemptAnswer)
                .delete({
                    quizAttemptId: input.quizAttemptId,
                    questionId: input.questionId,
                })

            if (answersFound.length) {
                const quizAttemptAnswer = new QuizAttemptAnswer();
                quizAttemptAnswer.quizAttemptId = quizAttempt.id;
                quizAttemptAnswer.questionId = question.id;
                quizAttemptAnswer.answerId = answersFound[0].id;
                quizAttemptAnswer.isCorrect = answersFound[0].isCorrect;

                await this.entityManager.save(quizAttemptAnswer);
            }
            return true;
        } catch (error) {
            return false;
        }                         
    }

    async submitQuiz(quizAttemptId: string) {
        const quizAttempt = await this.entityManager.getRepository(QuizAttempt)
            .findOne({
                where: {
                    id: quizAttemptId
                }
            })

        if (!quizAttempt) {
            return false;
        }

        quizAttempt.isCompleted = true;
        await this.entityManager.save(quizAttempt);

        return true;
    }
}
