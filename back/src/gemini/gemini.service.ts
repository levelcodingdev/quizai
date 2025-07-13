import { GoogleGenAI } from '@google/genai';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateQuizInput } from 'src/quiz/input/create-quiz.input';
import { questionAnswerPrompt } from './data/prompts';

@Injectable()
export class GeminiService {
    constructor(private genAI: GoogleGenAI) {}

    async generateQuizData(input: CreateQuizInput) {
        const prompt = questionAnswerPrompt(input.prompt, "single choice", 10)

        try {
            const response = await this.genAI.models.generateContent({
                model: "gemini-2.0-flash-001",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            })

            const rawText = response.text;

            if (!rawText) {
                throw new UnprocessableEntityException("Gemini AI could not generate the quiz");
            }

            return {
                data: JSON.parse(rawText),
                prompt,
            }
        } catch (e) {
            throw e;
        }
    }
}