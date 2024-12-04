import React, { useState, useRef, useEffect, useCallback} from 'react';
import './TaskItem.css'; 
import { FaBell, FaEdit, FaCalendarAlt} from 'react-icons/fa';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({
    task,
    handleUpdateAlarm,
    setContextMenu,
    editID,
    setEditID,
    editText,
    setEditText,
    handleUpdateDesc,
    setEditAlarmID,
    editAlarmID,
    handleUpdateDueDate,
    editDueDateID,
    setEditDueDateID,
    handleDeleteAlarm,
    handleDeleteDueDate,
    handleToggleStatus // function passed for changing task completion status with checkmark
}) => {
    const [isEditingAlarm, setIsEditingAlarm] = useState(false); // Track alarm editing state
    const [isEditingDueDate, setIsEditingDueDate] = useState(false); // Track alarm editing state
    const dateTimePickerRef = useRef(null);
    const dueDateTimePickerRef = useRef(null);
    const [isEditing, setIsEditing] =useState(false);
    const handleCheckboxToggle = () => {
        handleToggleStatus(task.task_id); // call the function passed to update completion status
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        // Use the task object to set the context menu
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            task_id: task.task_id, // Pass the task_id
            task_is_completed: task.task_is_completed, // Also pass other properties if needed
        });
    };


    useEffect(() => {
        if (editID === task.task_id) {
            setIsEditing(true);
        } else {
            setIsEditing(false); // Ensure editing state is reset when not matching
        }
    }, [editID, task]);


    useEffect(() => {
        if (editAlarmID === task.task_id) {
            setIsEditingAlarm(true);
        } else {
            setIsEditingAlarm(false); // Ensure editing state is reset when not matching
        }
    }, [editAlarmID, task]);

    useEffect(() => {
        if (editDueDateID === task.task_id) {
            setIsEditingDueDate(true);
        } else {
            setIsEditingDueDate(false); // Ensure editing state is reset when not matching
        }
    }, [editDueDateID, task]);




    useEffect(() => {
        const checkAlarm = () => {
          const now = new Date();
          if (!task.task_alarm_time) return; // No alarm set
    
          const alarmTime = new Date(task.task_alarm_time);
          if (now >= alarmTime) {
            // Show a toast notification
            const toastId = toast.info(`${task.task_desc} Alarm Time for : ${alarmTime.toLocaleTimeString()}`, {
              autoClose: false,
            });
            // Send a desktop notification
            if (Notification.permission === "granted") {
                new Notification("Task Alarm", {
                body: `${task.task_desc} Alarm Time: ${alarmTime.toLocaleTimeString()}`,
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Task Alarm", {
                    body: `${task.task_desc} Alarm Time: ${alarmTime.toLocaleTimeString()}`,
                    });
                }
                });
            }
            handleDeleteAlarm(task.task_id);
          }
        };
    
        const intervalId = setInterval(checkAlarm, 60000); // Check every minute
        return () => clearInterval(intervalId); // Cleanup on unmount
        }, [task]); // Re-run when task or alarm changes












    useEffect(() => {

        let dp;
        // Initialize AirDatepicker only when editing the alarm
        if (isEditingAlarm && dateTimePickerRef.current) {
            const buttonRect = dateTimePickerRef.current.getBoundingClientRect();
            const hasSpaceAbove = buttonRect.top > 300; // Adjust based on how much space you need above

            dp = new AirDatepicker(dateTimePickerRef.current, {
                timepicker: true,
                dateFormat: 'Y-m-d H:i',
                locale: localeEn,
                buttons: [
                    'clear',
                    {
                        content: 'Set Alarm',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                handleUpdateAlarm(task.task_id, selectedDate); // Call function to update alarm
                            }
                        },
                    },
                    {
                        content: 'Delete',
                        onClick: () => {
                            handleDeleteAlarm(task.task_id);
                        },
                    },
                ],
                position: hasSpaceAbove ? 'top right' : 'bottom right',

                onHide: () => {
                    setEditAlarmID(null); 
                },
            });

            dateTimePickerRef.current.focus();
            dp.show(); // Show the datepicker when initialized
        }

        return () => {
            if (dp) dp.destroy(); // Clean up
        };
    }, [isEditingAlarm, editAlarmID]);

    //const handleDoubleClick = () => {
    //    setEditingIndex(index);
    //    setEditTaskText(task.task_desc); // Set the current task description for editing
    //};

    useEffect(() => {

        let dp;
        // Initialize AirDatepicker only when editing the alarm
        if (isEditingDueDate && dueDateTimePickerRef.current) {
            const buttonRect = dueDateTimePickerRef.current.getBoundingClientRect();
            const hasSpaceAbove = buttonRect.top > 300; // Adjust based on how much space you need above

            dp = new AirDatepicker(dueDateTimePickerRef.current, {
                timepicker: true,
                dateFormat: 'Y-m-d H:i',
                locale: localeEn,
                buttons: [
                    'clear',
                    {
                        content: 'Set Due Date',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                handleUpdateDueDate(task.task_id, selectedDate); // Call function to update alarm
                            }
                        },
                    },
                    {
                        content: 'Delete',
                        onClick: () => {
                            handleDeleteDueDate(task.task_id);
                        },
                    },
                ],
                position: hasSpaceAbove ? 'top right' : 'bottom right',

                onHide: () => {
                    setEditDueDateID(null); 
                },
            });

            dueDateTimePickerRef.current.focus();
            dp.show(); // Show the datepicker when initialized
        }

        return () => {
            if (dp) dp.destroy(); // Clean up
        };
    }, [isEditingDueDate, editDueDateID]);

    const helperGetTaskDate = (task) => {
        const timeStamp = task.task_created_time_stamp;
        const date = new Date(timeStamp.replace(' ', 'T'));
        // gets only day month year
        const dateString = date.toLocaleDateString().slice(0, 10)

        return dateString
    };

    const handleUserInput = (e) => {
        const newDesc = e.target.value;
        setEditText(newDesc);  // Update local state first
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleUpdateDesc(task.task_id, editText);  // Update task when "Enter" is pressed
            setEditID(null)
            setEditText('')
        }
    };


    const handleEditButton = useCallback(() => {
        setEditID(task.task_id)
        const newDesc = task.task_desc;
        setEditText(newDesc);  // Update local state first
        setIsEditing(true)
    }, [editID, task]);

    const handleEditBlur = () => {
        setEditID(null)
        setEditText(null)
    };


    const isTaskOverdue = (task) => {
        if (!task.task_due_date) return false;
        const now = new Date();
        const dueDate = new Date(task.task_due_date);
        return now > dueDate && !task.task_is_completed;
    };

    const isTaskAlarmOverdue = (task) => {
        if (!task.task_alarm_time) return false;
        const now = new Date();
        const dueDate = new Date(task.task_alarm_time);
        return now > dueDate && !task.task_is_completed;
    };
    

    return (
        <div className="flex-1 text-[0.8rem] w-full ">

            {/*then return userinput prompt else return normal render */}
            <div
                onContextMenu={handleRightClick}
                className={`relative text-left task w-full transition-all duration-300 motion-duration-500 motion-preset-blur-left
    ${task.task_is_completed
                        ? `completed ${isEditing ? 'bg-[#AFDD66]' : 'hover:bg-[#AFDD66]'}`
                        : `uncompleted ${isEditing ? 'bg-[#161616]' : 'hover:bg-[#161616]'}`
                    }`}
            >
                {/*
                {isTaskOverdue(task) && (
                    <span className="absolute bottom-0 left-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#FF5C5C] opacity-75"></span>
                        <span className="absolute inline-flex rounded-full h-3 w-3 bg-[#FF1F1F]"></span>
                    </span>
                )}
                */}


                {isTaskOverdue(task) && (
                    <span className="absolute top-0 left-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-600 opacity-100"></span>
                        <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}



                <div className='flex flex-col w-full'>
                    {/* Checkbox for toggling task completion */}



                    <div className = "flex items-center">
                        <input
                            type="checkbox"
                            checked={task.task_is_completed}
                            onChange={handleCheckboxToggle}
                            className="ml-2 checkbox-round"
                        />
                        <div >

                            {/*if state of task is currently editing then return userinput prompt else return normal render */}
                            {isEditing ? (
                                <div class={`${task.task_is_completed ? 'text-[#292929] '
                                    : 'text-white'}`}>
                                    <input
                                        className="task-input bg-transparent  outline-none focus:outline-none w-full ml-5 placeholder-gray-500 pr-10"
                                        type="text"
                                        value={editText}
                                        onChange={handleUserInput}
                                        onKeyDown={handleKeyDown}
                                        onBlur={handleEditBlur}
                                        autoFocus
                                        placeholder="Type here"
                                    />
                                </div>
                            ) : (
                                <div className="flex">
                                    {/*Normal Render description and text*/}
                                    <div className="task-text ml-4">{task.task_desc} </div>

                                    <button onClick={handleEditButton} className='ml-2'>
                                        <FaEdit size={10} style={{ color: task.task_is_completed ? '#292929' : 'white' }} />
                                    </button>
                                    <div className={`absolute bottom-2 right-2 text-[0.6rem] mr-6 ${task.task_is_completed ? 'text-[#292929]' : 'text-gray-400'}`}> {helperGetTaskDate(task)}</div>
                                </div>
                            )}



                            <div className="flex ml-2">
                                {task.task_due_date && (
                                    <div className="dueDate-edit-button ml-2 mt-0.5">
                                        <FaCalendarAlt size={9} style={{ color: task.task_is_completed ? '#292929' : '#9CA3AF' }} />
                                    </div>
                                )}

                                {isEditingDueDate && (
                                    <input
                                        ref={dueDateTimePickerRef}
                                        className="hidden-datepicker"
                                    />
                                )}
                                {task.task_due_date && (
                                    <span
                                        className={`${task.task_is_completed ? "text-[#292929]" : "text-[#9CA3AF]"
                                            } alarm-time ml-1 text-[0.6rem]`}
                                    >
                                        {new Date(task.task_due_date).toLocaleString()}
                                    </span>
                                )}
                                {task.task_alarm_time && (
                                    <div className="alarm-edit-button ml-2 mt-0.5">
                                        <FaBell size={9} style={{ color: task.task_is_completed ? '#292929' : '#9CA3AF' }} />
                                    </div>
                                )}

                                {isEditingAlarm && (
                                    <input
                                        ref={dateTimePickerRef}
                                        className="hidden-datepicker"
                                    />
                                )}
                                {task.task_alarm_time && (
                                    <span
                                        className={`${task.task_is_completed ? "text-[#292929]" : "text-[#9CA3AF]"
                                            } alarm-time ml-1 text-[0.6rem]`}
                                    >
                                        {new Date(task.task_alarm_time).toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </div>

    );
};
export default TaskItem;