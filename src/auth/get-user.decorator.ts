import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext) =>{
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);



