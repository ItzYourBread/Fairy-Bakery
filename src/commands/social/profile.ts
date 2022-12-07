import {
    Constants,
    Client,
    CommandInteraction,
    ComponentInteraction,
} from 'eris';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';

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

        let main = {
            title: `${user.username}'s Profile`,
            color: Number(config.colour.embed),
            description: `Bio: New Bakery User 2022!`,
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
                caller.data.component_type === 3 &&
                caller.data.custom_id === 'ProfileSelectMenus'
            ) {
                await caller.deferUpdate();
                switch (caller.data.values[0]) {
                    case 'main':
                        caller.editOriginalMessage({ embeds: [main] });
                        break;
                    case 'cooldown':
                        caller.editOriginalMessage({ embeds: [cooldown] });
                        break;
                }
                clearTimeout(timer);
                client.off('interaction', collector);
            }
        };
        client.on('interaction', collector);
        timer = setTimeout(async () => {
            client.off('interaction', collector);
            await interaction.editOriginalMessage({
                components: [],
            });
            console.log('Collector ended!');
        }, 4000);
    },
};
