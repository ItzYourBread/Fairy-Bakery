import { Client, CommandInteraction } from 'eris';
declare const _default: {
    data: {
        name: string;
        description: string;
        options: {
            name: string;
            type: 6;
            description: string;
            required: boolean;
        }[];
    };
    run: (client: Client, interaction: CommandInteraction) => Promise<void>;
};
export default _default;
