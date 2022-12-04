import { config } from '../../structures/index';
import Eris from 'eris';
import { Constants, Client, CommandInteraction } from 'eris';
import { MessageCollector } from 'eris-collector';

export default {
    data: {
        name: 'test',
        description: 'A test command to test some shit',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        let test = {
            title: 'Test Embed',
            color: Number(config.colour.embed),
            description: 'Test anything in here as your wish!',
            timestamp: new Date(),
        };
        let buttons = {
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [
                {
                    label: 'Click me',
                    type: Constants.ComponentTypes.BUTTON,
                    style: Constants.ButtonStyles.PRIMARY,
                    custom_id: 'clickme',
                    disabled: false,
                },
            ],
        };

        await interaction.createMessage({
            embeds: [test],
            components: [buttons],
        });

        const collector = new MessageCollector(client, interaction.channel, {
            time: 1000 * 2,
        });

        collector.on('collect', async (i: Eris.ComponentInteraction) => {
            if (i.data.custom_id === 'clickme') {
                i.createMessage({
                    content: 'works!!!',
                });
            }
        });
    },
};
