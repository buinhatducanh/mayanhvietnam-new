"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGINS?.split(',') || [
            'http://localhost:3000',
            'http://localhost:3001',
        ],
        credentials: true,
    });
    app.setGlobalPrefix('api', {
        exclude: ['health'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const port = process.env.API_PORT ?? 4000;
    await app.listen(port);
    console.log(`🚀 API server running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map