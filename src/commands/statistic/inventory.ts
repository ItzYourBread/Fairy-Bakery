import { Constants, Client, CommandInteraction } from 'eris';
import { SmallNumber } from 'stubby.ts';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';
import { stocks } from '../../data/inventory.json';

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

        let Stocks = '';
        stocks.map((e) => {
            if (Data.stocks[e.value] && Data.stocks[e.value] >= 1) {
                Stocks += `${config.emoji[e.emoji]}${SmallNumber(
                    Data.stocks[e.value],
                    Data.stocks[e.value].toString().length + 1
                )} \ `;
            }
        });

        if (!Stocks) {
            Stocks = 'ᴇᴍᴘᴛʏ';
        }

        let inventory = {
            title: `${user.username}'s Inventory`,
            color: Number(config.colour.embed),
            description: Stocks,
            timestamp: new Date(),
        };

        await interaction.createMessage({ embeds: [inventory] });
        Stocks = '';
    },
};
