import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext) =>{ 
        const req = ctx.switchToHttp().getRequest();
        const {Password, ...user} = req.user;
        if (!user) throw new InternalServerErrorException('Usuario no encontrado')
        console.log(user)
        return user 
    },
)