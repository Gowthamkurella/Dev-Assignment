import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { RateQuestionDto } from './rate-question.dto';

export class RateQuestionsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RateQuestionDto)
    rates: RateQuestionDto[];
}
