import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS for specific origins
  app.enableCors({
    origin: [
      'https://futbolink.vercel.app',
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean),
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('API Futbolink')
    .setDescription('Documentación del back')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configure body parser for Stripe webhooks
  app.use(
    '/payment/webhook',
    bodyParser.raw({ type: 'application/json' })
  );

  // Use the PORT environment variable if available (for hosted environments)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();