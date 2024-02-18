import { httpServer } from "./app";

const DEFAULT_PORT = 3333;
const port = process.env.PORT || DEFAULT_PORT;

httpServer.listen(port, () => {
  console.log(`Server started on port ${port} 🚀`);
});
