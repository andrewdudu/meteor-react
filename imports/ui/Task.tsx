import React from "react";
import {Task} from "/imports/api/interfaces"

export const TaskComponent = ({task, onCheckboxClick, onDeleteClick}: {
    task: Task,
    onCheckboxClick: (t: Task) => void,
    onDeleteClick: (t: Task) => void
}) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={task.isChecked}
                onClick={() => onCheckboxClick(task)}
                readOnly
            />
            <span>{task.text}</span>
            <button onClick={() => onDeleteClick(task)}>&times;</button>
        </li>
    )
}