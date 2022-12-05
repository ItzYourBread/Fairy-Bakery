import { Constants, Client, CommandInteraction } from 'eris';
import { SmallNumber } from 'stubby.ts';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';
import { bakeries, resources } from '../../data/inventory.json';

export default {
    data: {
        name: 'inventory',
        description: 'Your inventory',
        options: [
            {
                name: 'user',
                type: Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: false,
            },
        ],
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        const user_id =
            interaction.data.options && interaction.data.options[0]
                ? (interaction.data.options[0] as any).value
                : interaction.member.id;
        const user = await client.users.get(user_id);
        const Data =
            (await User.findOne({ id: user_id })) || new User({ id: user_id });

        let Bakeries = '';
        let Resources = '';
        bakeries.map((e) => {
            if (Data.bakeries[e.value] && Data.bakeries[e.value] >= 1) {
                Bakeries += `${config.emojis[e.emoji]}${SmallNumber(
                    Data.bakeries[e.value],
                    Data.bakeries[e.value].toString().length + 1
                )} \ `;
            }
        });
        resources.map((e) => {
            if (Data.resources[e.value] && Data.resources[e.value] >= 1) {
                Resources += `${config.emojis[e.emoji]}${SmallNumber(
                    Data.resources[e.value],
                    Data.resources[e.value].toString().length + 1
                )} \ `;
            }
        });

        if (!Bakeries && !Resources) {
            var msg = 'ᴇᴍᴘᴛʏ';
        }

        let inventory = {
            title: `${user.username}'s Inventory`,
            color: Number(config.colour.embed),
            description: msg,
            fields: [],
            timestamp: new Date(),
        };
        if (Bakeries) {
            inventory.fields.push({
                name: 'Bakeries',
                value: Bakeries,
                inline: true,
            });
        }
        if (Resources) {
            inventory.fields.push({
                name: 'Resources',
                value: Resources,
                inline: true,
            });
        }

        await interaction.createMessage({ embeds: [inventory] });
        Bakeries = '';
        Resources = '';
    },
};
