const contact = require('./contact')

const main = async () => {
    const name = await contact.questionContact('Masukan Nama Anda: ');
    const email = await contact.questionContact('Masukan Email Anda: ');
    const noHp = await contact.questionContact('Masukan No Hp Anda: ');

    contact.saveContact(name, email, noHp);
}

main();