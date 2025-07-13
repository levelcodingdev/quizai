import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Module({
  providers: [
    GeminiService,
    {
      inject: [ConfigService],
      provide: GoogleGenAI,
      useFactory: async (configService: ConfigService) => {
        return new GoogleGenAI({
          apiKey: configService.get<string>('GEMINI_API_KEY') ?? '',
        })
      }
    }
  ],
  exports: [
    GeminiService,
  ],
})
export class GeminiModule {}
