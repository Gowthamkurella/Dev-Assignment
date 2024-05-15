import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './rating/rating.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://gowthamkurella12:JCdYrKFQqTrzRgPL@cluster0.vp3hntf.mongodb.net/QuestRate'),QuestionModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
