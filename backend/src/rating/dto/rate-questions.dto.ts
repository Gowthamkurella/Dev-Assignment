import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RateQuestionDto } from './rate-question.dto';

export class RateQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RateQuestionDto)
  rates: RateQuestionDto[];
}
