// readline modul core
const fs = require('fs');
const validator = require('validator');

// cek folder
const dirPath = 'data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// cek file
const dataPath = 'data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const saveContact = (name, email, noHp) => {

    const contact  = { name, email, noHp };

    const contacts = loadContact();

    // check duplicate
    const check = contacts.find((contact) => contact.name === name);
    if (check) {
        console.log('Contact has been registered');
        return false;
    }

    // check email
    if (`${email}`) {
        if (!validator.isEmail(`${email}`)) {
            console.log('Email not valid');
            return false;
        }
    }

    // check no Hp
    if (!validator.isMobilePhone(`${noHp}`, 'id-ID')) {
        console.log('Number Phone not valid');
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Thanks for input');

};

// Show Contact
const listContact = () => {
    const contacts = loadContact();
    console.log('List Contact')
    contacts.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name} - ${c.noHp}`);
    });
};

const detailContact = (n) => {
    const contacts = loadContact();
    const contact = contacts.find((c) => c.name.toLowerCase() === n.toLowerCase());

    if (!contact) {
        console.log(`${n} can't find contact`);
        return false;
    }

    console.log(contact.name);
    console.log(contact.noHp);
    if (contact.email) {
        console.log(contact.email);
    }
};

const removeContact = (a) => {
    const contacts = loadContact();
    const newContact = contacts.filter((c) => c.name.toLowerCase() !== a.toLowerCase());
    if (contacts.length === newContact.length) {
        console.log(`${a} can't find contact`);
        return false;
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
    console.log(`${a} success deleted`);
};

module.exports = { saveContact, listContact, detailContact, removeContact }