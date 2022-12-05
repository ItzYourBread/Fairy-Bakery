import { Constants, Client, CommandInteraction } from 'eris';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';

export default {
    data: {
        name: 'balance',
        description: 'Cash!!!',
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
        await interaction.createMessage({
            content: `**${user.username}** has ${
                config.emoji.cash
            }\`${Data.cash.toLocaleString()}\` cash `,
        });
    },
};
