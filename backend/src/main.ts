import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const puerto = 5000;
  console.log("Servicio iniciado en el puerto: "+puerto);
  await app.listen(puerto);
  
}
bootstrap();
