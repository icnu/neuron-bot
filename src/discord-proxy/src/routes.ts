import { FastifyInstance, FastifyPluginCallback, RouteHandlerMethod, RouteShorthandOptions } from "fastify";
import { Token } from "./token";

export type Route = {
    path: string,
    method: string,
    options: RouteShorthandOptions,
    handler: RouteHandlerMethod
};

const _routes: Route[] = [
    ...Token.routes
];

export const router: FastifyPluginCallback<{}> = (server: FastifyInstance) => {
    _routes.forEach(route => {
        switch (route.method.toLowerCase()) {
            case 'get':
                server.get(route.path, route.options, route.handler);
                break;
            
            case 'post':
                server.post(route.path, route.options, route.handler);
                break;
        }
    });
}