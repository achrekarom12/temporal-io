import { Client, Connection } from '@temporalio/client';
import { nanoid } from 'nanoid';
import { example } from './workflows';
import { TEMPORAL_SERVER_URL } from './env';

async function run() {
  const connection = await Connection.connect({ address: TEMPORAL_SERVER_URL });
  const client = new Client({
    connection,
  });

  const handle = await client.workflow.start(example, {
    taskQueue: 'hello-world',
    args: ['Dev'],
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});