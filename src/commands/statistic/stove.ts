import { Constants, Client, CommandInteraction } from 'eris';
import { SmallNumber } from 'stubby.ts';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';

export default {
    data: {
        name: 'stove',
        description: 'Stove SubCommand',
        options: [
            {
                name: 'view',
                description: 'View your stove',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.data.options[0].name === 'view') {
			let user = interaction.member;
			
            let stove = {
                title: `${user.username}'s Stove`,
                color: Number(config.colour.embed),
                description: `empty`,
                timestamp: new Date(),
            };
            await interaction.createMessage({ embeds: [stove] });
        }
    },
};
