import { config, ComponentCollector } from '../../structures/index';
import Eris from 'eris';
import { Constants, Client, CommandInteraction } from 'eris';

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

        const collector = new ComponentCollector(interaction.channel, {
            filter: (i) =>
                i.user?.id === interaction.user?.id &&
                ['btn-prev', 'btn-next'].includes(i.data.custom_id) &&
                i.data.component_type === 2,
            timeout: 2000,
        });

        collector.on('collect', async (i: CommandInteraction) => {
            console.log('Works');
        });

        collector.once('end', async (i: CommandInteraction) => {
            console.log('Ended collections');
        });
    },
};
