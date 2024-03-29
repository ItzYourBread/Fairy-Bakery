import { Constants, Client, CommandInteraction } from 'eris';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';
import { SmallNumber } from 'stubby.ts';

export default {
    data: {
        name: 'balance',
        description: 'Your balance',
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

        let balance = {
            title: `${user.username}'s Balance`,
            color: Number(config.colour.embed),
            description: '',
            timestamp: new Date(),
        };

        balance.description += `${config.emoji.coin}${SmallNumber(
            Data.coin,
            Data.coin.toString().length + 1
        )} ** **`;
        balance.description += `${config.emoji.heart}${SmallNumber(
            Data.heart,
            Data.heart.toString().length + 1
        )} ** **`;

        await interaction.createMessage({ embeds: [balance] });
    },
};
