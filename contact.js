// readline modul core
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout,
});

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

// pertanyaan dengan promise
const questionContact = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (name) => {
            resolve(name);
        });
    });
};

const saveContact = (name, email, noHp) => {
    const contact  = { name, email, noHp };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    contacts.push(contact);
    console.log(contacts);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('terimakasih sudah memasukan')
    rl.close();
}

module.exports = { questionContact, saveContact }