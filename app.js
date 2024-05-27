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
}).
demandCommand();

// show contact
yargs.command({
    command: 'list',
    describe: 'Show all Contact',
    handler() {
        contacts.listContact();
    }
});

// show detail contact
yargs.command({
    command: 'detail',
    describe: 'Show detail Contact',
    builder: {
        name: {
            describe: 'Full Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.name);
    }
});

// remove contact
yargs.command({
    command: 'delete',
    describe: 'Remove Contact',
    builder: {
        name: {
            describe: 'Full Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.removeContact(argv.name);
    }
});

yargs.parse();