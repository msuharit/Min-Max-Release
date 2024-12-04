import React, {useState,useRef,useEffect} from 'react';
import './TaskInput.css'
import { FaBell, FaCalendarAlt  } from 'react-icons/fa';
import AirDatepicker from 'air-datepicker';

import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

const TaskInput = ({ newTask, setNewTask, onAddTask, 
    alarmTime, setAlarmTime, newAlarmVisible, setNewAlarmVisible, 
    dueDate, setDueDate, newDueDateVisible, setNewDueDateVisible,
    handleDeleteAlarm,handleDeleteDueDate
    }) => {
    
    // alarm datepicker calendar
    const dateTimePickerRef = useRef(null);
    useEffect(() => {
        let dp;
        if (newAlarmVisible && dateTimePickerRef.current) {
            // Initialize AirDatepicker with a built-in position setting
            dp = new AirDatepicker(dateTimePickerRef.current, {
                timepicker: true,
                dateFormat: 'Y-m-d H:i',
                timeFormat: 'hh:mm aa',
                locale: localeEn,
                buttons: [
                    'clear',
                    {
                        content: 'Set Alarm',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                setAlarmTime(selectedDate);
                                setNewAlarmVisible(false);
                            }
                        },
                    },
                    {
                        content: 'Delete',
                        onClick: () => {
                            setAlarmTime('')
                        },
                    },
                ],
                position:"top right"
            });

            dp.show();
        }
        return () => {
            if (dp) dp.destroy();
        };
    }, [newAlarmVisible, setAlarmTime]);

    // dueDate time picker calendar
    const dueDateTimePickerRef = useRef(null);
    useEffect(() => {
        let dp;
        if (newDueDateVisible && dueDateTimePickerRef.current) {
            // Initialize AirDatepicker with a built-in position setting
            dp = new AirDatepicker(dueDateTimePickerRef.current, {
                timepicker: true,
                dateFormat: 'Y-m-d H:i',
                timeFormat: 'hh:mm aa',
                locale: localeEn,
                buttons: [
                    'clear',
                    {
                        content: 'Set Due Date',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                setDueDate(selectedDate);
                                setNewDueDateVisible(false);
                            }
                        },
                    },
                    {
                        content: 'Delete',
                        onClick: () => {
                            setDueDate('')
                        },
                    },
                ],
                position:"top right"
            });
            dp.show();
        }
        return () => {
            if (dp) dp.destroy();
        };
    }, [newDueDateVisible, setDueDate]);


    // Check if the due date is past and task is incomplete
    const isTaskPastDue =
        dueDate && !newTask && new Date(dueDate) < new Date();

    // render 
    return (
    
    
    

        <div className="bottom-0 left-0 right-0 absolute">
            <div className='flex m-5'>
                <button
                    className="alarm-toggle-button mr-3 ml-6 flex"
                    onClick={() => setNewAlarmVisible(!newAlarmVisible)}
                    title="Set an alarm"
                >
                    <FaBell style={{ color: newAlarmVisible ? 'gray' : 'white' }} />
                </button>
                {newAlarmVisible && (
                    <input
                        ref={dateTimePickerRef}
                        className="hidden-datepicker-input"
                        position= "bottom left"
                    />
                )}
                {alarmTime &&
                    <div className="alarm-time-display text-white flex">
                        Alarm set for: {alarmTime.toLocaleString()}
                    </div>}
            </div>
            <div className='flex m-5'>
                <button
                    className="dueDate-toggle-button mr-3 ml-6 flex"
                    onClick={() => setNewDueDateVisible(!newDueDateVisible)}
                    title="Set a Due Date"
                >
                    <FaCalendarAlt style={{ color: newDueDateVisible ? 'gray' : 'white' }} />
                </button>
                {newDueDateVisible && (
                    <input
                        ref={dueDateTimePickerRef}
                        className="hidden-datepicker-input"
                        position= "bottom left"
                    />
                )}
                {dueDate &&
                    <div className="dueDate-time-display text-white flex">
                        Due Date set for: {dueDate.toLocaleString()}
                    </div>}
            </div>

            {/* Task input box */}
            <div
                className={`border-[3px] border-white p-[16] bg-[#161616] rounded-full mb-10 ${
                isTaskPastDue ? 'task-past-due' : ''
                }`}
            >

                {/*Basic text input*/}
                <div className='flex'>
                <input className="bg-transparent text-white p-2 outline-none focus:outline-none w-full ml-5"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            onAddTask();
                            setAlarmTime('');
                            setDueDate('');
                        }
                    }}
                    placeholder="Enter a Task"
                />
                </div>
            </div>
        </div>
    );
};
export default TaskInput;