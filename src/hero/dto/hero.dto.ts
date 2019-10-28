import { ApiModelProperty } from '@nestjs/swagger';

export class CreateHeroDTO {
    @ApiModelProperty({ description: 'Nombre del SuperHéroe'})
    readonly name: string;

    @ApiModelProperty({ description: 'Habilidad del SuperHéroe'})
    readonly skill: string;

    @ApiModelProperty({ description: 'País del SuperHéroe'})
    readonly country: string;
}