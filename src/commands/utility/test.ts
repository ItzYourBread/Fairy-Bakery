import { config, ButtonPagination } from '../../structures/index';
import Eris from 'eris';
import { Constants, Client, CommandInteraction } from 'eris';

export default {
    data: {
        name: 'test',
        description: 'A test command to test some shit',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        let page1 = { title: 'Hello!', footer: {} };
        let page2 = { title: 'How', footer: {} };
        let page3 = { title: 'Are', footer: {} };
        let page4 = { title: 'You', footer: {} };
        let page5 = { title: 'Doing', footer: {} };
        let page6 = { title: 'Today!', footer: {} };

        let embeds = [page1, page2, page3, page4, page5, page6];

        embeds.map((embed, index) => {
            embed.footer = { text: `Pages: ${index + 1}/${embeds.length}` };
        });

        ButtonPagination(client, interaction, embeds, 15000);
    },
};
