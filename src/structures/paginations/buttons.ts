import {
    Constants,
    Client,
    CommandInteraction,
    ComponentInteraction,
} from 'eris';

/**
 *
 * @param {CommandInteraction} interaction
 * @param {Array} embeds
 */
export async function ButtonPagination(
    client: Client,
    interaction: CommandInteraction,
    embeds: any
) {
    let allbuttons = {
        type: Constants.ComponentTypes.ACTION_ROW,
        components: [
            {
                label: '<<',
                type: Constants.ComponentTypes.BUTTON,
                style: Constants.ButtonStyles.PRIMARY,
                custom_id: '0',
                disabled: false,
            },
            {
                label: '<',
                type: Constants.ComponentTypes.BUTTON,
                style: Constants.ButtonStyles.PRIMARY,
                custom_id: '2',
                disabled: false,
            },
            {
                label: '>',
                type: Constants.ComponentTypes.BUTTON,
                style: Constants.ButtonStyles.PRIMARY,
                custom_id: '3',
                disabled: false,
            },
            {
                label: '>>',
                type: Constants.ComponentTypes.BUTTON,
                style: Constants.ButtonStyles.PRIMARY,
                custom_id: '4',
                disabled: false,
            },
        ],
    };

    if (embeds.length === 1) {
        if (interaction.acknowledged) {
            return interaction.editOriginalMessage({
                embeds: [embeds[0]],
            });
        } else {
            return interaction.editOriginalMessage({
                embeds: [embeds[0]],
            });
        }
    }

    embeds = embeds.map((embed, index) => {
        return embed.footer({
            text: `Page: ${index + 1}/${embeds.length}`,
        });
    });

    let sendMsg;
    if (interaction.acknowledged) {
        sendMsg = await interaction.editOriginalMessage({
            embeds: [embeds[0]],
            components: [allbuttons],
        });
    } else {
        sendMsg = await interaction.createMessage({
            embeds: [embeds[0]],
            components: [allbuttons],
        });
    }

    let currentPage = 0;
    let timer = null;
    const collector = async (b: ComponentInteraction) => {
        await b.deferUpdate().catch((e) => null);
        // page first
        switch (b.data.custom_id) {
            case '0':
                {
                    if (currentPage != 0) {
                        currentPage = 0;
                        await sendMsg
                            .editOriginalMessage({
                                embeds: [embeds[currentPage]],
                                components: [allbuttons],
                            })
                            .catch((e) => null);
                    }
                }
                break;
            case '1':
                {
                    if (currentPage != 0) {
                        currentPage -= 1;
                        await sendMsg
                            .editOriginalMessage({
                                embeds: [embeds[currentPage]],
                                components: [allbuttons],
                            })
                            .catch((e) => null);
                    } else {
                        currentPage = embeds.length - 1;
                        await sendMsg
                            .editOriginalMessage({
                                embeds: [embeds[currentPage]],
                                components: [allbuttons],
                            })
                            .catch((e) => null);
                    }
                }
                break;
            case '2':
                {
                    allbuttons.components.forEach((btn) => btn.disabled(true));
                    await sendMsg
                        .editOriginalMessage({
                            embeds: [embeds[currentPage]],
                            components: [allbuttons],
                        })
                        .catch((e) => null);
                }
                break;
            case '3':
                {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        await sendMsg
                            .editOriginalMessage({
                                embeds: [embeds[currentPage]],
                                components: [allbuttons],
                            })
                            .catch((e) => null);
                    } else {
                        currentPage = 0;
                        await sendMsg
                            .editOriginalMessage({
                                embeds: [embeds[currentPage]],
                                components: [allbuttons],
                            })
                            .catch((e) => null);
                    }
                }
                break;
            case '4':
                {
                    currentPage = embeds.length - 1;
                    await sendMsg
                        .editOriginalMessage({
                            embeds: [embeds[currentPage]],
                            components: [allbuttons],
                        })
                        .catch((e) => null);
                }
                break;

            default:
                break;
        }
        clearTimeout(timer);
        client.off('interaction', collector);
    };
    client.on('interaction', collector);
    timer = setTimeout(async () => {
        client.off('interaction', collector);
        await interaction.editOriginalMessage({
            components: [],
        });
        console.log('Collector ended!');
    }, 15000);
}
