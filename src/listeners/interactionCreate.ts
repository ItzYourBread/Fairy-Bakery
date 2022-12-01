import { Client, CommandInteraction } from 'eris';
import { commands } from '../handlers/commands';
import { User } from '../database/models/profile';
import chalk from 'chalk';

export function interactionCreate(client: Client) {
    client.on('interactionCreate', async (interaction: CommandInteraction) => {
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
