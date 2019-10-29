import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class QueryPaginateDTO {
    @IsOptional()
    @ApiModelProperty({required: false})
    readonly offset: number;

    @IsOptional()
    @ApiModelProperty({required: false})
    readonly limit: number;
}