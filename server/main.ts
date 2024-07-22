import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {TaskCollection} from "/imports/api/TaskCollection";

const insertTask = (taskText: string) => TaskCollection.insert({
    text: taskText,
    createdAt: new Date(),
    isChecked: false
});

const tasks: string[] = [
    'First Task',
    'Second Task',
    'Third Task',
    'Fourth Task',
    'Fifth Task'
]

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }

    if (TaskCollection.find().count() === 0) {
        tasks.forEach(insertTask)
    }
});
