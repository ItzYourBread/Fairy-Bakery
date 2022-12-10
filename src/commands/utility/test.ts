import { config, ButtonPagination } from '../../structures/index';
import Eris from 'eris';
import { Constants, Client, CommandInteraction } from 'eris';

export default {
    data: {
        name: 'test',
        description: 'A test command to test some shit',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        let page1 = { title: 'Hello!' };
        let page2 = { title: 'How' };
        let page3 = { title: 'Are' };
        let page4 = { title: 'You' };
        let page5 = { title: 'Doing' };
        let page6 = { title: 'Today!' };

        let embeds = [page1, page2, page3, page4, page5, page6];

        ButtonPagination(client, interaction, embeds, 10000);
    },
};
