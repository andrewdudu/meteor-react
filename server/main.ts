import {Meteor} from 'meteor/meteor';
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

Meteor.startup(async () => {
    if (TaskCollection.find().count() === 0) {
        tasks.forEach(insertTask)
    }
});
