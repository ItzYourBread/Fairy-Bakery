/// <reference types="node" />
import { Channel, ComponentInteraction } from 'eris';
import EventEmitter from 'events';
declare type InteractionFilter = (interaction: ComponentInteraction) => boolean;
declare type ComponentCollectorOptions = {
    timeout?: number;
    count?: number;
    filter?: InteractionFilter;
};
export declare class ComponentCollector extends EventEmitter {
    private channel;
    private timeout;
    private count;
    private filter;
    private running;
    collected: ComponentInteraction[];
    constructor(channel: Channel, options: ComponentCollectorOptions);
    start: () => Promise<this>;
    stop: () => this;
    private onInteractionCreate;
    private onCollect;
}
export {};
