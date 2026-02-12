import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { poemAgent } from './agent';

async function main() {
    const rl = readline.createInterface({ input, output });

    console.log('\x1b[36m%s\x1b[0m', '--- Poem Agent Chat ---');
    console.log('Type "exit" or "quit" to stop.');

    while (true) {
        const userInput = await rl.question('\x1b[32mYou:\x1b[0m ');

        if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
            console.log('Goodbye!');
            break;
        }

        if (!userInput.trim()) continue;

        try {
            process.stdout.write('\x1b[35mPoem Agent:\x1b[0m ');
            const response = await poemAgent(userInput);
            console.log(response);
            console.log(''); // Add a newline for better spacing
        } catch (error) {
            console.error('\x1b[31mError:\x1b[0m', error);
        }
    }

    rl.close();
}

main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
