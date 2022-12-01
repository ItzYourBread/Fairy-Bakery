import { Constants, Client, CommandInteraction } from 'eris';
import { config } from '../../structures/index';

export default {
    data: {
        name: 'help',
        description: 'Bakery help!',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        let commands = {
            title: 'Help and Commands!',
            color: Number(config.colour.embed),
            fields: [
                {
                    name: 'Misc',
                    value: '`ping`',
                    inline: false,
                },
                {
                    name: 'Utility',
                    value: '`help`',
                    inline: false,
                },
            ],
            timestamp: new Date(),
        };
        await interaction.createMessage({ embeds: [commands] });
    },
};
