import React, { useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './TaskDetailedView.css';

export default function DetailedView({task}) {
    const [viewDetails, setViewDetails] = useState(null);
    useEffect(() => {
        setViewDetails(task);
    }, [task]);

    const helperGetTaskDate = (taskDate) => {
        const timeStamp = taskDate;
        const date = new Date(timeStamp.replace(' ', 'T'));
        // gets only day month year
        const dateString = date.toLocaleDateString().slice(0, 10)

        return dateString
    };


    if (!viewDetails) return null;
    return (
        <div className='bg-black'>
            <Popup
                open={viewDetails !== null}
                modal
                nested
                onClose={() => setViewDetails(null)}
                class = ""
            >
                {close => (
                    <div>
                        {task.task_desc && <div>Description: {task.task_desc}</div>}
                        {task.task_created_time_stamp && (
                            <div>Date added: {helperGetTaskDate(task.task_created_time_stamp)}</div>
                        )}
                        {task.task_due_date && <div>Due Date: {helperGetTaskDate(task.task_due_date)}</div>}
                        {task.task_alarm_time && <div>Alarm: {helperGetTaskDate(task.task_alarm_time)}</div>}

                    </div>
                )}
            </Popup>

        </div>
    )
};