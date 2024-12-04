import React, { useState } from 'react';  // Add useState here
import TaskItem from './TaskItem';
import './TaskGrouping.css';
import TaskCompletionRateForDays from './TaskCompletionRateForDays';

const TaskGrouping = ({
  tasks,
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
  handleToggleStatus
}) => {
  const [showCompleted, setShowCompleted] = useState(false);

  // Split tasks into completed and uncompleted
  const completedTasks = tasks.filter(task => task.task_is_completed);
  const uncompletedTasks = tasks.filter(task => !task.task_is_completed);

  return (

    <div className="text-white">
      {/* Task List (Uncompleted Tasks) */}
      <div className="task-list">
        {uncompletedTasks.map((task, index) => (
          <TaskItem
            key={task.task_id}
            task={task}
            index={index}
            handleUpdateAlarm={handleUpdateAlarm}
            setContextMenu={setContextMenu}
            editID={editID}
            setEditID={setEditID}
            editText={editText}
            setEditText={setEditText}
            handleUpdateDesc={handleUpdateDesc}
            setEditAlarmID={setEditAlarmID}
            editAlarmID={editAlarmID}
            handleUpdateDueDate={handleUpdateDueDate}
            editDueDateID={editDueDateID}
            setEditDueDateID={setEditDueDateID}
            handleDeleteAlarm={handleDeleteAlarm}
            handleDeleteDueDate={handleDeleteDueDate}
            handleToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      <hr className="h-1 bg-[#3AA7FA] border-0 rounded mt-0" />

      {/* Toggle Completed Tasks */}
      <div className="ml-[10px] mt-5 mb-[1px] flex">
        <div className="rounded-full bg-[#8CC63F] flex hover:bg-[#AFDD66] transition-all duration-300">
          <label className="inline-flex items-center cursor-pointer m-1">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-border-600"></div>
            <span className="text-[0.8rem] text-[#333333] ml-1.5 mr-2 select-none">Completed</span>
          </label>
        </div>
      </div>

      {/* Task List (Completed Tasks, conditionally rendered) */}
      {showCompleted && (
        <div className="task-list text-line-through">
          {completedTasks.map((task, index) => (
            <TaskItem
              key={task.task_id}
              task={task}
              index={index}
              handleUpdateAlarm={handleUpdateAlarm}
              setContextMenu={setContextMenu}
              editID={editID}
              setEditID={setEditID}
              editText={editText}
              setEditText={setEditText}
              handleUpdateDesc={handleUpdateDesc}
              setEditAlarmID={setEditAlarmID}
              editAlarmID={editAlarmID}
              handleUpdateDueDate={handleUpdateDueDate}
              editDueDateID={editDueDateID}
              setEditDueDateID={setEditDueDateID}
              handleDeleteAlarm={handleDeleteAlarm}
              handleDeleteDueDate={handleDeleteDueDate}
              handleToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default TaskGrouping;
