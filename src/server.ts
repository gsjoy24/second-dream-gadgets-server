/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import seedSuperAdmin from './app/seed';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`the server is running on ${config.port}`);
    });
    await seedSuperAdmin();
  } catch (error) {
    console.log(error);
  }
}
main();

//  handle unhandledRejection
process.on('unhandledRejection', () => {
  console.log('🚩🚩 unhandledRejection error 🚩🚩');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// handle uncaughtException
process.on('uncaughtException', () => {
  console.log('🚩🚩 uncaughtException error 🚩🚩');
  process.exit(1);
});
