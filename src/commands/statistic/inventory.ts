import { Constants, Client, CommandInteraction } from 'eris';
import { SmallNumber } from 'stubby.ts';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';
import fetch from 'node-fetch';

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

        let RestApi = await fetch(`${config.service.api}/json/inventory`).then(
            (r) => r.json()
        );

        let Bakeries = '';
        let Stocks = '';
        RestApi.bakeries.map((e) => {
            if (Data.bakeries[e.value] && Data.bakeries[e.value] >= 1) {
                Bakeries += `${config.emoji[e.emoji]}${SmallNumber(
                    Data.bakeries[e.value],
                    Data.bakeries[e.value].toString().length + 1
                )} \ `;
            }
        });
        RestApi.stocks.map((e) => {
            if (Data.stocks[e.value] && Data.stocks[e.value] >= 1) {
                Stocks += `${config.emoji[e.emoji]}${SmallNumber(
                    Data.stocks[e.value],
                    Data.stocks[e.value].toString().length + 1
                )} \ `;
            }
        });

        if (!Bakeries && !Stocks) {
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
        if (Stocks) {
            inventory.fields.push({
                name: 'Stocks',
                value: Stocks,
                inline: true,
            });
        }

        await interaction.createMessage({ embeds: [inventory] });
        Bakeries = '';
        Stocks = '';
    },
};
