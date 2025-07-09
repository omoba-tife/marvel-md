module.exports = async (senderNumber, prefix, command, setReply) => {
    global.mess = {
    wait: 'processing a sec....',
    nsfw: 'nsfw is prohibited in this group',
    success: 'successful',
    limit: `[❕] your limit has run out\nif you want unlimited limit, you can buy premium. for only 10 thousand, you can get an unlimited limit for 3 months.\nplease type ${prefix}owner to find out.`,
    only: {
        prem: 'this feature is only for premium users',
        vip: 'this feature is for vip users only 🔥💀\ncontact 2348135483097 to buy',
        group: 'this feature can only be accessed in groups',
        private: 'this feature can only be accessed in private chat',
        ownerB: 'command for bot user only',
        owner: 'command for sudo users only',
        admin: 'this feature can only be accessed by admins !!!',
        reseller: 'command can only be used by registered resellers',
        Badmin: 'make bot admin to be able to use this feature'
    }
};
    const fs = require("fs");
    const chalk = require("chalk");
    const file = require.resolve(__filename);
    fs.watchFile(file, () => {
        fs.unwatchFile(file);
        console.log(chalk.redBright(`Reloading file: ${__filename}`));
        delete require.cache[file];
        require(file);
    });
};