import { Client, CommandInteraction } from 'eris';
declare const _default: {
    data: {
        name: string;
        description: string;
        options: {
            name: string;
            description: string;
            type: 1;
        }[];
    };
    run: (client: Client, interaction: CommandInteraction) => Promise<void>;
};
export default _default;
