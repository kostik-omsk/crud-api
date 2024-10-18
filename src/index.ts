import "dotenv/config";
import startServer from "./startServer";
const { PORT } = process.env || 4000;

startServer().listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
