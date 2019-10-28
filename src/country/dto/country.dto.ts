import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCountryDTO {
    @ApiModelProperty()
    readonly name: string;
}