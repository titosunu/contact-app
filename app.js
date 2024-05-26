// argument from commandline
const yargs = require('yargs');
const contacts = require('./contact');

yargs.command({
    command: 'add',
    describe: 'Create New Contact',
    buider: {
        name: {
            describe: 'Full Name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHp: {
            describe: 'Nomor Hp',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.saveContact(argv.name, argv.email, argv.noHp);
    }
});

yargs.parse();