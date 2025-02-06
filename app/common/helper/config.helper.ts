import dotenv from "dotenv";
import process from "process";
import path from "path";

dotenv.config();

/**
 * Loads the environment variables from a file. The file name is determined
 * by the value of the NODE_ENV environment variable, and defaults to
 * "development" if that variable is not set.
 * @returns {void}
 */
export const loadConfig = () => {
  const env = process.env.NODE_ENV ?? "development";
  const filepath = path.join(process.cwd(), `.env.${env}`);
  dotenv.config({ path: filepath });
};