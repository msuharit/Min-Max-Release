import React, { useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './TaskDetailedView.css';

export default function DetailedView({task, onUpdateTask}) {
    const [viewDetails, setViewDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    useEffect(() => {
        if (task) {
            setViewDetails(task);
            setNewDescription(task.task_desc); 
        }
    }, [task]);
    // useEffect(() => {
    //     setViewDetails(task);
    // }, [task]);

    const helperGetTaskDate = (taskDate) => {
        const timeStamp = taskDate;
        const date = new Date(timeStamp.replace(' ', 'T'));
        // gets only day month year
        const dateString = date.toLocaleDateString().slice(0, 10)

        return dateString
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (newDescription.trim() && viewDetails) {
            // Update the task description
            await onUpdateTask(viewDetails.task_id, newDescription);
            setViewDetails({ ...viewDetails, task_desc: newDescription });
            setIsEditing(false);
        }
    };

    const handleCancelClick = () => {
        setNewDescription(viewDetails?.task_desc || ''); // Reset/preserve description
        setIsEditing(false);
    };
    
    const handleInputChange = (e) => {
        setNewDescription(e.target.value);
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
                        {task.task_desc && <div>Description: {isEditing ? (
                                    <div className='detailedview-edit-container'>
                                        <input
                                            type="text"
                                            value={newDescription}
                                            onChange={handleInputChange}
                                            className="edit-detailedview-input"
                                        />
                                        <button onClick={handleSaveClick} className="save-detailedview-button">
                                            Save
                                        </button>
                                        <button onClick={handleCancelClick} className="cancel-detailedview-button">
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className='detailedview-description-container'>
                                        <span className="detailedview-description-text">{task.task_desc}</span>
                                        <button onClick={handleEditClick} className="edit-detailedview-button">
                                            Edit
                                        </button>
                                    </div>
                                )}</div>}
                        <div>{task.task_created_time_stamp && (
                            <div>Date added: {helperGetTaskDate(task.task_created_time_stamp)}</div>
                        )}
                        {task.task_due_date && <div>Due Date: {helperGetTaskDate(task.task_due_date)}</div>}
                        {task.task_alarm_time && <div>Alarm: {helperGetTaskDate(task.task_alarm_time)}</div>}
                        </div>
                        <button className="close-detailedview-button" onClick={close}>Close</button>
                    </div>
                )}
            </Popup>

        </div>
    )
};