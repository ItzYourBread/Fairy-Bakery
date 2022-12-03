import { Constants, Client, CommandInteraction } from 'eris';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';

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

        if (!Bakeries) {
            Bakeries = 'empty';
        }
        if (!Resources) {
            Resources = 'empty';
        }

        let inventory = {
            title: `${user.username}'s Inventory`,
            color: Number(config.colour.embed),
            fields: [
                {
                    name: 'Bakeries',
                    value: Bakeries,
                    inline: false,
                },
                {
                    name: 'Resources',
                    value: Resources,
                    inline: false,
                },
            ],
            timestamp: new Date(),
        };
        await interaction.createMessage({ embeds: [inventory] });
        Bakeries = '';
        Resources = '';
    },
};
