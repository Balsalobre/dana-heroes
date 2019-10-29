import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator'

export class AuthCredentialsDTO {
    @ApiModelProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly email: string;
    
    @ApiModelProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Contraseña demasiado debil' })
    password: string;
}