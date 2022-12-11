import {
    Constants,
    Client,
    CommandInteraction,
    ComponentInteraction,
} from 'eris';
import { SmallNumber } from 'stubby.ts';
import { User } from '../../database/models/profile';
import { config } from '../../structures/index';
import { bakeries } from '../../data/inventory.json';

export default {
    data: {
        name: 'storage',
        description: 'storage subcommands',
        options: [
            {
                name: 'view',
                description: 'View your bakeries storage',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
            {
                name: 'upgrade',
                description: 'Upgrade your bakaries storage space',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.data.options[0].name === 'view') {
            const user = interaction.member;
            const Data =
                (await User.findOne({ id: user.id })) ||
                new User({ id: user.id });

            let Bakeries = '';
            bakeries.map((e) => {
                if (Data.bakeries[e.value] && Data.bakeries[e.value] >= 1) {
                    Bakeries += `${config.emoji[e.emoji]}${SmallNumber(
                        Data.bakeries[e.value],
                        Data.bakeries[e.value].toString().length + 1
                    )} \ `;
                }
            });

            let storage = {
                title: `${user.username}'s Storage`,
                color: Number(config.colour.embed),
                description: '',
                fields: [],
                footer: {
                    text: `You only can store ${Data.storage.space} types of bakeries`,
                },
                timestamp: new Date(),
            };

            if (!Bakeries) {
                storage.description = 'ᴇᴍᴘᴛʏ';
            } else {
                storage.description =
                    'You can upgrade your storage by typing `/storage upgrade`.';
                storage.fields.push({
                    name: `Storage level ${Data.storage.level}`,
                    value: Bakeries,
                    inline: false,
                });
            }

            await interaction.createMessage({ embeds: [storage] });
            Bakeries = '';
        } else if (interaction.data.options[0].name === 'upgrade') {
            const user = interaction.member;
            const Data =
                (await User.findOne({ id: user.id })) ||
                new User({ id: user.id });

            let pages = [
                {
                    title: 'Storage upgrade',
                    color: Number(config.colour.embed),
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/1049381132438876171/1051519163383955486/IMG_0474.png',
                    },
                    description:
                        'Do you want to uprade your storage to level 2?',
                    timestamp: new Date(),
                },
            ];
            let buttons = {
                type: Constants.ComponentTypes.ACTION_ROW,
                components: [
                    {
                        label: `Upgrade`,
                        type: Constants.ComponentTypes.BUTTON,
                        style: Constants.ButtonStyles.SUCCESS,
                        custom_id: 'upgradeStorage',
                        disabled: false,
                    },
                ],
            };
            pages[0].description += `\n**Perks**\nspace 2 => 4\n\nCost: ${config.emoji.coin}500`;

            await interaction.createMessage({
                embeds: [pages[0]],
                components: [buttons],
            });

            const collector = async (caller: ComponentInteraction) => {
                if (caller.member.id != interaction.member.id) {
                    return caller.createMessage({
                        content: "It's not for you!",
                        flags: 64,
                    });
                }
                await caller.deferUpdate();
                switch (caller.data.custom_id) {
                    case 'upgradeStorage':
                        {
                            if (Data.coin < 1) {
                                return caller.createMessage({
                                    content: `You don't have enough **${config.emoji.coin}Coin** to uprgade storage!`,
                                    flags: 64,
                                });
                            }

                            await caller.editOriginalMessage({
                                embeds: [
                                    {
                                        title: 'Storage upgraded!',
                                        color: Number(config.colour.success),
                                        thumbnail: {
                                            url: 'https://cdn.discordapp.com/attachments/1049381132438876171/1051519163383955486/IMG_0474.png',
                                        },
                                        description: `You successfully upgraded your storage to level **${
                                            Data.storage.level - 1
                                        }** to **${Data.storage.level}**`,
                                        timestamp: new Date(),
                                    },
                                ],
                                components: [],
                            });
                        }
                        break;
                }
                client.off('interactionCreate', collector);
            };
            client.on('interactionCreate', collector);
            setTimeout(async () => {
                buttons.components.map((d) => {
                    d.disabled = true;
                });
                await interaction.editOriginalMessage({
                    components: [buttons],
                });
                client.on('interactionCreate', collector);
            }, 30000);
        }
    },
};
