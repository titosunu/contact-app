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

const saveContact = (name, email, noHp) => {
    const contact  = { name, email, noHp };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

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
    console.log('terimakasih sudah memasukan')

}

module.exports = { saveContact }