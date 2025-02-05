const mongo = require('../../mongo');
const inviteSchema = require('../../schemas/invite-schema');
const path = require('path');

module.exports = {
    name: 'inviteCreate',
    async execute(invite, client, Discord) {
        await mongo().then(async mongoose => {
            try {
                await inviteSchema.findOneAndUpdate({
                    code: invite.code,
                    userId: invite.inviterId,
                    uses: invite.uses
                }, {
                    code: invite.code,
                    userId: invite.inviterId,
                    uses: invite.uses
                }, {
                    upsert: true
                }).catch(err => console.error(`${path.basename(__filename)} There was a problem updating a database entry: `, err));
            } finally {
                //do nothing
            }
        }).catch(err => console.error(`${path.basename(__filename)} There was a problem connecting to the database: `, err));
    }
}