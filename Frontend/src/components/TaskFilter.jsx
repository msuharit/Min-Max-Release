import { MdRemoveCircle } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";

const TaskFilter = ({ 
    filterTaskCreatedTimeStamp, 
    setFilterTaskCreatedTimeStamp,
    filterTaskDueDate,
    setFilterTaskDueDate,
    filterTaskAlarm,
    setFilterTaskAlarm
}) => {
    // Format the dates for display
    const formattedCreatedDate = filterTaskCreatedTimeStamp 
        ? new Date(filterTaskCreatedTimeStamp).toLocaleDateString('en-us').slice(0, 10) 
        : null;

    const formattedDueDate = filterTaskDueDate 
        ? new Date(filterTaskDueDate).toLocaleDateString('en-us').slice(0, 10) 
        : null;

    const formattedAlarm = filterTaskAlarm
        ? new Date(filterTaskAlarm).toLocaleDateString('en-us').slice(0, 10) 
        : null;

        if (!filterTaskCreatedTimeStamp && !filterTaskDueDate && !filterTaskAlarm) return null;

    return (
        <div className="flex gap-2">
            {formattedCreatedDate && (
                <button
                    className="text-white text-[0.8rem] bg-transparent hover:text-gray-300"
                    onClick={() => setFilterTaskCreatedTimeStamp(null)}
                    aria-label="Clear created date filter"
                >
                    <div className='flex items-center max-h-8 rounded-full bg-[#3aa7fa] mt-[0.2rem] p-[0.4rem] gap-1 motion-duration-500 motion-preset-blur-left'>
                        <FaXmark className="mt-[1px]" />
                        <div className="text-white text-[0.8rem] text-left">
                            Created: {formattedCreatedDate}
                        </div>
                    </div>
                </button>
            )}

            {formattedDueDate && (
                <button
                    className="text-white text-[0.8rem] bg-transparent hover:text-gray-300"
                    onClick={() => setFilterTaskDueDate(null)}
                    aria-label="Clear due date filter"
                >
                    <div className='flex items-center max-h-8 rounded-full bg-[#3aa7fa] mt-[0.2rem] p-[0.4rem] gap-1 motion-duration-500 motion-preset-blur-left'>
                        <FaXmark className="mt-[1px]" />
                        <div className="text-white text-[0.8rem] text-left">
                            Due: {formattedDueDate}
                        </div>
                    </div>
                </button>
            )}

            {filterTaskAlarm !== null && (
                <button
                    className="text-white text-[0.8rem] bg-transparent hover:text-gray-300"
                    onClick={() => setFilterTaskAlarm(null)} 
                    aria-label="Clear alarm filter"
                >
                    <div className='flex items-center max-h-8 rounded-full bg-[#3aa7fa] mt-[0.2rem] p-[0.4rem] gap-1 motion-duration-500 motion-preset-blur-left'>
                        <FaXmark className="mt-[1px]" />
                        <div className="text-white text-[0.8rem] text-left">
                            Alarm: {formattedAlarm}
                        </div>
                    </div>
                </button>
            )}

        </div>
    );
};

export default TaskFilter;