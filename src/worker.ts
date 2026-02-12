import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';
import { TEMPORAL_SERVER_URL } from './env';
import { AiSdkPlugin } from '@temporalio/ai-sdk';
import { google } from '@ai-sdk/google';

export async function run() {
  const connection = await NativeConnection.connect({
    address: TEMPORAL_SERVER_URL,
  });
  try {
    const worker = await Worker.create({
      plugins: [
        new AiSdkPlugin({
          modelProvider: google,
        }),
      ],
      connection,
      namespace: 'default',
      taskQueue: 'ai-sdk',
      workflowsPath: require.resolve('./workflows'),
      activities,
    });

    await worker.run();
  } finally {
    await connection.close();
  }
}