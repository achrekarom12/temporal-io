import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';
import { TEMPORAL_SERVER_URL } from './env';

export async function run() {
  const connection = await NativeConnection.connect({
    address: TEMPORAL_SERVER_URL,
  });
  try {
    const worker = await Worker.create({
      connection,
      namespace: 'default',
      taskQueue: 'hello-world',
      workflowsPath: require.resolve('./workflows'),
      activities,
    });

    await worker.run();
  } finally {
    await connection.close();
  }
}