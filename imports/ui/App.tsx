import React from 'react';
import {TaskComponent} from "/imports/ui/Task";
import {Task} from "/imports/api/interfaces";
// @ts-ignore
import {useTracker} from 'meteor/react-meteor-data';
import {TaskCollection} from "/imports/api/TaskCollection";
import {TaskForm} from "/imports/ui/TaskForm";

const toggleChecked = ({_id, isChecked}: Task) => {
    TaskCollection.update(_id, {
        $set: {
            isChecked: !isChecked
        }
    });
}

const deleteTask = ({_id} : Task) => {
    TaskCollection.remove(_id);
}

export const App = () => {
    const tasks: Task[] = useTracker(() => TaskCollection.find({}, {sort: {createdAt: -1}}).fetch());

    return (
        <div>
            <h1>Welcome to Meteor!</h1>

            <TaskForm/>

            {tasks.map(task => <TaskComponent key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask}/>)}
        </div>
    );
}
