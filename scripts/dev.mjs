import { spawn } from 'node:child_process';
import process from 'node:process';

const build = spawn(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
build.on('exit', (code) => {
  if (code !== 0) process.exit(code || 1);
  const server = spawn(process.execPath, ['scripts/serve.mjs'], { stdio: 'inherit' });
  const stop = () => server.kill('SIGTERM');
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
  server.on('exit', (serverCode) => process.exit(serverCode || 0));
});
