// readline modul core
const fs = require('fs');

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

    contacts.push(contact);
    console.log(contacts);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('terimakasih sudah memasukan')

}

module.exports = { saveContact }