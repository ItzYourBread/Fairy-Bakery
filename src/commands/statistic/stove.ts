import { Constants, Client, CommandInteraction } from 'eris';
import { SmallNumber } from 'stubby.ts';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';

export default {
    data: {
        name: 'stove',
        description: 'Stove SubCommand',
        options: [
            {
                name: 'view',
                description: 'View your stove',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.data.options[0].name === 'view') {
            let user = interaction.member;
            const Data =
                (await User.findOne({ id: user.id })) ||
                new User({ id: user.id });

            let stove = {
                title: `${user.username}'s Stove`,
                color: Number(config.colour.embed),
                description: 'Baking',
                fields: [],
                timestamp: new Date(),
            };

            let FirstStove = '';
            if (Date.now() - Data.stove.first.date < Data.stove.first.timer) {
                FirstStove += `Baking ${Data.stove.first.bakery}!`;
                FirstStove += `\n**Timer:** ${Data.stove.first.timer}`;
            } else {
                FirstStove = 'Stove has nothing to bake :(';
            }
            if (Data.stove.first.status) {
                stove.fields.push({
                    name: `Stove [Lvl ${Data.stove.first.level}]`,
                    value: FirstStove,
                    inline: true,
                });
            }
            await interaction.createMessage({ embeds: [stove] });
        }
    },
};
