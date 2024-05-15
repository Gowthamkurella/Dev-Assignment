import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Response, ResponseSchema } from '../question/schemas/response.schema';
import { Question,QuestionSchema } from 'src/question/schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Response.name, schema: ResponseSchema },
    ]),
  ],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
