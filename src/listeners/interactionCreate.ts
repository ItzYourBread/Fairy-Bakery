import { CommandInteraction } from 'eris';
import { commands } from '../handlers/commands';
import chalk from 'chalk';

export function interactionCreate(client) {
    client.on('interactionCreate', async (interaction) => {
        if (interaction instanceof CommandInteraction) {
            for (let slashCommand of commands) {
                if (slashCommand.name === interaction.data.name) {
                    await slashCommand.run(client, interaction);
                    break;
                }
            }
        }
    });
    console.log(chalk.cyanBright('[Event] interactionCreate is loaded'));
}
