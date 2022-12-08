import { Client, CommandInteraction } from 'eris';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';

export default {
    data: {
        name: 'daily',
        description: 'Get your daily reward!',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        const user = interaction.member;
        const Data =
            (await User.findOne({ id: user.id })) || new User({ id: user.id });

        if (Data.daily.time > Date.now()) {
            return interaction.createMessage({
                embeds: [
                    {
                        color: Number(config.colour.danger),
                        description: `You already claimed your daily reward today!\nYour next daily <t:${
                            Math.floor(Data.daily.time / 1000) + 3600
                        }:R>`,
                    },
                ],
                flags: 64,
            });
        }

        if (Date.now() - Data.daily.time > 172800000) {
            Data.daily.streak = 1;
        } else {
            Data.daily.streak += 1;
        }

        let coin = 75;
        let streak = Data.daily.streak;
        const bonus = Math.round(0.02 * coin * streak);
        if (streak > 1) {
            coin = coin + bonus;
        }
        let dailyReset = new Date();

        Data.coin += coin;
        Data.daily.time = dailyReset.setUTCHours(23, 59, 59, 999);
        Data.save();

        let reward = {
            title: `${user.username}'s Daily`,
            color: Number(config.colour.embed),
            description: `You received ${config.emoji.coin}\`${coin}\` and added to your profile!`,
            fields: [
                {
                    name: 'Streak',
                    value: `${Data.daily.streak}`,
                    inline: true,
                },
                {
                    name: 'Next Daily',
                    value: `<t:${Math.floor(Data.daily.time / 1000) + 3600}:R>`,
                    inline: true,
                },
            ],
            timestamp: new Date(),
        };
        await interaction.createMessage({ embeds: [reward] });
    },
};
