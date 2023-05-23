import "./dotenv";

import { initServer } from "./app";
import { initDatabase } from "./config/db";

const port = 5000;

initDatabase();
initServer(port);
