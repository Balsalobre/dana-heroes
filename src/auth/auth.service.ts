import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {

        const salt = await bcrypt.genSalt();
        authCredentialsDTO.password = await this.hashPassword(authCredentialsDTO.password, salt);
        
        const user = {
            email: authCredentialsDTO.email,
            password: authCredentialsDTO.password,
            salt: salt
        };

        const userModel = new this.userModel(user);
        try{
            return await userModel.save();
        } catch(error) {
            if(error.code === 11000) {
                throw new ConflictException('El usuario ya existe en la aplicación');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}> {
        const email = await this.validateUserPassword(authCredentialsDTO);
        console.log(email);

        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const { email, password } = authCredentialsDTO;
        const emailExist = await this.userModel.findOne({ email });
        if(!emailExist) throw new NotFoundException('El usuario no existe');
        
        const hash = await bcrypt.hash(password, emailExist.salt);
        if (emailExist && hash === emailExist.password) {
            return emailExist.email;
        } else {
            throw new UnauthorizedException('Credenciales no válidas');
        }
    }
}
