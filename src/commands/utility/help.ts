import { Constants, Client, CommandInteraction } from 'eris';
import { config, ButtonPagination } from '../../structures/index';

export default {
    data: {
        name: 'help',
        description: 'Bakery help!',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        let pages = [
            {
                title: 'Help & Commands',
                color: Number(config.colour.embed),
                fields: [
                    {
                        name: '</balance:0>',
                        value: 'Your balance',
                        inline: false,
                    },
                    {
                        name: '</inventory:0>',
                        value: 'Your inventory to store stocks',
                        inline: false,
                    },
                    {
                        name: '</storage:0>',
                        value: 'View storage, Upgrade storage',
                        inline: false,
                    },
                    {
                        name: '</daily:0>',
                        value: 'Get your daily reward',
                        inline: false,
                    },
                    {
                        name: '</profile:0>',
                        value: 'View profile',
                        inline: false,
                    },
                ],
                footer: {
                    text: 'Pages 1/2',
                },
            },
            {
                title: 'Help & Commands',
                color: Number(config.colour.embed),
                fields: [
                    {
                        name: '</profile:0>',
                        value: 'View profile',
                        inline: false,
                    },
                    {
                        name: '</ping:0>',
                        value: 'Ping pong',
                        inline: false,
                    },
                    {
                        name: '</help:0>',
                        value: 'Get help from FairyBakery',
                        inline: false,
                    },
                ],
                footer: {
                    text: 'Pages 2/2',
                },
            },
        ];
        ButtonPagination(client, interaction, pages, 35000);
    },
};
