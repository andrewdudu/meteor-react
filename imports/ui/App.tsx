import React, {useState} from 'react';
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

const deleteTask = ({_id}: Task) => {
    TaskCollection.remove(_id);
}

export const App = () => {
    const [hideCompleted, setHideCompleted] = useState(false);
    const hideCompletedFilter = {isChecked: {$eq: false}};
    const tasks: Task[] = useTracker(() => TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, {sort: {createdAt: -1}}).fetch());

    const pendingTaskCount = useTracker(() => TaskCollection.find(hideCompletedFilter).count());
    const pendingTaskTitle = `${pendingTaskCount ? ` (${pendingTaskCount})` : ''}`;


    return (
        <div className="app">
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>
                            📝️ To Do List
                            {pendingTaskTitle}
                        </h1>
                    </div>
                </div>
            </header>

            <div className="main">
                <TaskForm/>
                <div className="filter">
                    <button onClick={() => setHideCompleted(!hideCompleted)}>
                        {hideCompleted ? 'Show All' : 'Hide Completed'}
                    </button>
                </div>
                <ul className="tasks">
                    {tasks.map(task => (
                        <TaskComponent
                            key={task._id}
                            task={task}
                            onCheckboxClick={toggleChecked}
                            onDeleteClick={deleteTask}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
