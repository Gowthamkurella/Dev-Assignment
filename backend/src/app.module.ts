import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://gowthamkurella12:JCdYrKFQqTrzRgPL@cluster0.vp3hntf.mongodb.net/QuestRate'),QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
