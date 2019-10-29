import { Controller, Body, Post, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return this.authService.signUp(authCredentialsDTO);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDTO);
    }

    // @Post('/test')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard())
    // test(@Req() req: any) {
    //     console.log(req);
    // }
}
