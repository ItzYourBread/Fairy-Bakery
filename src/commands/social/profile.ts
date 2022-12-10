import {
    Constants,
    Client,
    CommandInteraction,
    ComponentInteraction,
} from 'eris';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';
import { SmallNumber } from 'stubby.ts';
import { stocks, bakeries } from '../../data/inventory.json';

export default {
    data: {
        name: 'profile',
        description: 'View our bakery members profile!',
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
        let Bakeries = '';
        stocks.map((e) => {
            if (Data.stocks[e.value] && Data.stocks[e.value] >= 1) {
                Stocks += `${config.emoji[e.emoji]}${SmallNumber(
                    Data.stocks[e.value],
                    Data.stocks[e.value].toString().length + 1
                )} \ `;
            }
        });
        bakeries.map((e) => {
            if (Data.bakeries[e.value] && Data.bakeries[e.value] >= 1) {
                Bakeries += `${config.emoji[e.emoji]}${SmallNumber(
                    Data.bakeries[e.value],
                    Data.bakeries[e.value].toString().length + 1
                )} \ `;
            }
        });
        if (!Stocks) {
            Stocks = 'ᴇᴍᴘᴛʏ';
        }
        if (!Bakeries) {
            Bakeries = 'ᴇᴍᴘᴛʏ';
        }

        let main = {
            title: `${user.username}'s Profile`,
            color: Number(config.colour.embed),
            description: `Bio: New Bakery User 2022!`,
            timestamp: new Date(),
        };
        let inventory = {
            title: `${user.username}'s Inventory`,
            color: Number(config.colour.embed),
            description: Stocks,
            timestamp: new Date(),
        };
        let storage = {
            title: `${user.username}'s Storage`,
            color: Number(config.colour.embed),
            description: Bakeries,
            timestamp: new Date(),
        };
        let cooldown = {
            title: `${user.username}'s Cooldown`,
            color: Number(config.colour.embed),
            description: `None`,
            timestamp: new Date(),
        };

        let menus = {
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [
                {
                    type: Constants.ComponentTypes.SELECT_MENU,
                    custom_id: 'ProfileSelectMenus',
                    placeholder: 'Options',
                    options: [
                        {
                            label: 'Main',
                            value: 'main',
                        },
                        {
                            label: 'Inventory',
                            value: 'inventory',
                        },
                        {
                            label: 'Storage',
                            value: 'storage',
                        },
                        {
                            label: 'Cooldown',
                            value: 'cooldown',
                        },
                    ],
                    min_values: 1,
                    max_values: 1,
                    disabled: false,
                },
            ],
        };

        await interaction.createMessage({
            embeds: [main],
            components: [menus],
        });

        let timer = null;
        const collector = async (caller: ComponentInteraction) => {
            if (caller.member.id !== interaction.member.id) {
                return caller.createMessage({
                    content: "It's not for you!",
                    flags: 64,
                });
            }
            if (
                caller.data.component_type ===
                    Constants.ComponentTypes.SELECT_MENU &&
                caller.data.custom_id === 'ProfileSelectMenus'
            ) {
                await caller.deferUpdate();
                switch (caller.data.values[0]) {
                    case 'main':
                        await caller.editOriginalMessage({ embeds: [main] });
                        console.log('Main works');
                        break;
                    case 'inventory':
                        await caller.editOriginalMessage({
                            embeds: [inventory],
                        });
                        console.log('inventory works');
                        break;
                    case 'storage':
                        await caller.editOriginalMessage({ embeds: [storage] });
                        console.log('storage works');
                        break;
                    case 'cooldown':
                        await caller.editOriginalMessage({
                            embeds: [cooldown],
                        });
                        console.log('cooldown works');
                        break;
                }
            }
            clearTimeout(timer);
            client.off('interactionCreate', collector);
        };
        client.on('interactionCreate', collector);
        timer = setTimeout(async () => {
            client.off('interactionCreate', collector);
            await interaction.editOriginalMessage({
                components: [],
            });
            console.log('Collector ended!');
        }, 15000);
    },
};
