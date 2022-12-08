import Eris, { Constants, Client, CommandInteraction } from 'eris';
import { SmallNumber } from 'stubby.ts';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';
import fetch from 'node-fetch';

export default {
    data: {
        name: 'storage',
        description: 'storage subcommands',
        options: [
            {
                name: 'view',
                description: 'View your bakeries storage',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
            {
                name: 'upgrade',
                description: 'Upgrade your bakaries storage space',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.data.options[0].name === 'view') {
            const user = interaction.member;
            const Data =
                (await User.findOne({ id: user.id })) ||
                new User({ id: user.id });

            let RestApi = await fetch(
                `${config.service.api}/json/inventory`
            ).then((r) => r.json());

            let Bakeries = '';
            RestApi.bakeries.map((e) => {
                if (Data.bakeries[e.value] && Data.bakeries[e.value] >= 1) {
                    Bakeries += `${config.emoji[e.emoji]}${SmallNumber(
                        Data.bakeries[e.value],
                        Data.bakeries[e.value].toString().length + 1
                    )} \ `;
                }
            });

            if (!Bakeries) {
                Bakeries = 'ᴇᴍᴘᴛʏ';
            }

            let storage = {
                title: `${user.username}'s Storage`,
                color: Number(config.colour.embed),
                description: Bakeries,
                timestamp: new Date(),
            };

            await interaction.createMessage({ embeds: [storage] });
            Bakeries = '';
        } else if (interaction.data.options[0].name === "upgrade") {
			return interaction.createMessage({ content: "This command is under development!"})
		}
    },
};
