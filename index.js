import server from "./src/server/server.js";
import "./src/config/config.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
