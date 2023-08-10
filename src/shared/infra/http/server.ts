import { app } from './app';

const port: number = Number(process.env.PORT) || 3333;

app.listen(port, () => console.log(`Server is running at port ${port}`));
