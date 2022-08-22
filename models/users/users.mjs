const arc = require('@architect/functions')
const arcClient = await arc.tables()
const client = arcClient._doc 
const singletable = arcClient.name('singletable') 


import {Table} from 'dynamodb-onetable'


const MySchema = {
    format: 'onetable:1.1.0',
    version: '0.0.1',
    indexes: {
        primary: { hash: 'pk', sort: 'sk' },
        gs1:     { hash: 'gs1pk', sort: 'gs1sk', follow: true },
        ls1:     { sort: 'id', type: 'local' },
    },
    models: {
        Account: {
            pk:          { type: String, value: 'account:${id}' },
            sk:          { type: String, value: 'account:' },
            id:          { type: String, generate: 'ulid', validate: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i },
            name:        { type: String, required: true },
            status:      { type: String, default: 'active' },
            zip:         { type: String },
        },
        User: {
            pk:          { type: String, value: 'account:${accountName}' },
            sk:          { type: String, value: 'user:${email}', validate: EmailRegExp },
            id:          { type: String, required: true },
            accountName: { type: String, required: true },
            email:       { type: String, required: true },
            firstName:   { type: String, required: true },
            lastName:    { type: String, required: true },
            username:    { type: String, required: true },
            role:        { type: String, enum: ['user', 'admin'], required: true, default: 'user' },
            balance:     { type: Number, default: 0 },

            gs1pk:       { type: String, value: 'user-email:${email}' },
            gs1sk:       { type: String, value: 'user:' },
        }
    },
    params: {
        'isoDates': true,
        'timestamps': true,
    },
}

const table = new Table({
    client,
    name: singletable,
    schema: MySchema,
})