import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './TaskCalendar.css';
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

const Calendar = ({ handleSetFilterTaskTimeStamp, globalTasks}) => {
    const [calendarTasks, setCalendarTasks] = useState([]);
    const [displayCompleted, setDisplayCompleted] = useState(false)








    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 131);
    const endDate = new Date(currentDate);




    // used by graph fucntion. Modify this if you want to hcange how coloring works
    const getDictOfCountAndDate = () => {
        const taskCounts = {};

        globalTasks.forEach((task) => {
            if ( displayCompleted === task.task_is_completed) {
                const timeStamp = task.task_created_time_stamp;
                const date = new Date(timeStamp.replace(' ', 'T'));
                date.setHours(0, 0, 0, 0);

                if (!taskCounts[date]) {
                    taskCounts[date] = 0;
                }
                taskCounts[date]++;
            }
        });

        const dateAndCount = Object.entries(taskCounts).map(([date, count]) => ({
            date,
            count,
        }));

        return dateAndCount
    };


  const generateEmptyCountForNullDates = (startDate, endDate, taskCounts) => {
    const dateMap = {};
    taskCounts.forEach((task) => {
      const formattedDate = new Date(task.date).toLocaleDateString(); 
      dateMap[formattedDate] = task;
    });

    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toLocaleDateString();
      dates.push({
        date: dateString,
        count: dateMap[dateString] ? dateMap[dateString].count : 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // update when new task is created or when user toggles display
  const [completedDisplayRatio, setCompletedDisplayRatio] = useState();
  const [uncompletedDisplayRatio, setUncompletedDisplayRatio] = useState();
  useEffect(() => {
    setCalendarTasks(generateEmptyCountForNullDates(startDate, endDate, getDictOfCountAndDate()))
    const totalTasks = globalTasks.length; 
    const completedTasks = globalTasks.filter(task => task.task_is_completed).length;
    const uncompletedTasks = globalTasks.filter(task => !task.task_is_completed).length;

    const completionPercentage = totalTasks
    ? parseFloat(((completedTasks / totalTasks) * 100).toFixed(2))
    : 0;

    const unCompletionPercentage = totalTasks
    ? parseFloat(((uncompletedTasks / totalTasks) * 100).toFixed(2))
    : 0;


    setCompletedDisplayRatio(completionPercentage + "%")
    setUncompletedDisplayRatio(unCompletionPercentage + "%")







  }, [globalTasks, displayCompleted]);

  return (
    <div class="flex flex-col items-center bg-[#161616] flex-1 m-0 items-stretch">

      <div className='mt-6 flex justify-evenly'>
        <div>
          <div className="text-[#AFDD66] text-1xl transition-all duration-300 motion-duration-500 motion-preset-blur-left " key={completedDisplayRatio}>{completedDisplayRatio} Tasks</div>
          <div className="text-[#AFDD66] text-1xl ">Complete</div>
        </div>

        <div>
          <div className="text-[#D9E021] text-1xl transition-all duration-300 motion-duration-500 motion-preset-blur-left" key={uncompletedDisplayRatio}>{uncompletedDisplayRatio} Tasks</div>
          <div className="text-[#D9E021] text-1xl ">Uncomplete</div>
        </div>
      </div>





      <div
        className=" justify-center text-white mt-6 text-2xl flex transition-all duration-300 transition-all duration-300 motion-duration-500 motion-preset-pop"
        onClick={() => setDisplayCompleted((prev) => !prev)}
        key={displayCompleted}
      >
        {displayCompleted ? 'Completed' : 'Uncompleted'}
      </div>

      <hr className=" justify-center w-[80%] h-1 bg-[#ffffff] border-0 rounded md:my-5 mx-auto" />
      <div class="task-calendar mb-0"></div>
      <div className="calendar-heatmap-container flex-1">

        <CalendarHeatmap
          className="flex-1 "
          startDate={startDate}
          endDate={endDate}
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
          horizontal={false}
          gutterSize={3}
          showMonthLabels={true}
          values={calendarTasks}
          onClick={(value) => {
            if (value && value.date) {
              const date = new Date(value.date);
              handleSetFilterTaskTimeStamp(date.toLocaleDateString());
            }
          }}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            if (value.count > 3) {
              if (displayCompleted) {
                return `color-scale-3`;

              } else {
                return `color-scale-6`;
              }
            }
            //hard coded lmao
            return displayCompleted ? `color-scale-${value.count}` : value.count ? `color-scale-${value.count + 3}` : `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) {
              return { 'data-tooltip-id': 'task-tooltip', 'data-tooltip-content': 'No data' };
            }
            const localDate = new Date(value.date).toLocaleDateString(); // Tooltip in local date format
            return {
              'data-tooltip-id': 'task-tooltip',
              'data-tooltip-content': `${localDate}: ${value.count} ${displayCompleted ? 'Completed' : 'Incompleted'}`,
            };
          }}
        />
        <Tooltip id="task-tooltip" />

      </div>
    </div>
  );
};

export default Calendar;