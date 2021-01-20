const Command = require('../../structures/Command');

module.exports = class TakeRoleCMD extends Command {
    constructor(client) {
        super(client, {
            name: 'takerole',
            memberName: 'takerole',
            group: 'moderation',
            description: 'Take specific role from an user.',
            guildOnly: true,
            aliases: ['trole'],
            throttling: {
                usages: 1,
                duration: 5
            },
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    key: 'member',
                    prompt: 'Please specific an user that you want to take role.',
                    type: 'member'
                },
                {
                    key: 'role',
                    prompt: 'Give bot the role name or id.',
                    type: 'role'
                }
            ]
        });
    }
    run(message, { member, role }) {
        if (!member) return message.channel.send('Member not found.');
        if (!role) return message.channel.send('Role not found');

        let bot = message.guild.me;
        let bothighest = bot.roles.highest.rawPosition;
        let rolepositon = role.rawPosition;

        if (bothighest <= rolepositon) return message.channel.send(`Bot can\'t take role that higher or equal bot role`);
        try {
            member.roles.remove(role.id);
            message.channel.send(`Successfully added role \`${role.name}\` to ${member.displayName}.`);
        } catch (err) {
            message.reply(`I can't hide channel because there is an error.`);
            console.error(err);
        }

    }
    onBlock(message, reason, data) {
        if (reason === 'clientPermissions') return message.reply(`Bot don't have \`${data.missing}\` Permissions to run this command.`);
        else if (reason === 'permission') return message.reply(`${data.response}`);
        else if (reason === 'throttling') return message.reply(`Please try again after ${data.remaining} second(s)`);
    }
};