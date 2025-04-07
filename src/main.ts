import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";



async function server() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )
// hello iam beser
  const port= process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App Starting on port ${port}`);
  })
}


server();
