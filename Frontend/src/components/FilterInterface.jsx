import React, { useState, useRef, useEffect } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';
import { FaCalendarAlt} from 'react-icons/fa';

const FilterInterface = ({ 
    handleSetFilterTaskDueDate,
    handleSetFilterTaskTimeStamp,
    handleSetFilterTaskAlarm
}) => {
    const [date, setDate] = useState(null);


    

    const [calendarVisible, setCalendarVisible] = useState(false);
    
    const calendarRef = useRef(null);
    useEffect(() => {
        let dp;
        
        if (calendarVisible && calendarRef.current) {
            // Initialize AirDatepicker with a built-in position setting
            const buttonRect = calendarRef.current.getBoundingClientRect();
            const hasSpaceAbove = buttonRect.top > 300; // Adjust based on how much space you need above

            dp = new AirDatepicker(calendarRef.current, {
                dateFormat: 'Y-m-d H:i',
                locale: localeEn,
                buttons: [
                    'clear',
                    {
                        content: 'Set Calendar',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                setDate(selectedDate);
                                setCalendarVisible(false);
                            }
                        },
                    },
                    {
                        content: 'Delete',
                        onClick: () => {
                            setDate('')
                        },
                    },
                ],
                position: hasSpaceAbove ? 'top right' : 'bottom right',
                onHide: () => {
                    setCalendarVisible(false);
                },
            });
            calendarRef.current.focus();
            dp.show();
        }
        return () => {
            if (dp) 
                dp.destroy();
        };
    }, [calendarVisible, setDate]);
    
    return (

        <div className='flex-col'>

            <div className="ml-6 mb-2 text-left">
                {calendarVisible && (
                    <input
                        ref={calendarRef}
                        className="hidden-datepicker-input"
                        position="flex"
                    />
                )}
                {date ?
                    <div className="date text-white"
                        onClick={() => setCalendarVisible(!calendarVisible)}
                    >
                        {date.toLocaleDateString()}
                    </div> :
                    
                    <div className="date text-white"
                        onClick={() => setCalendarVisible(!calendarVisible)}
                    >
                    </div>

                    
                }
            </div>


            <div class="flex transition-all duration-300 hover:bg-[#3AA7FA]"
                onClick={() => {
                    const today = new Date();
                    const formattedDate = today.toLocaleDateString();
                    handleSetFilterTaskDueDate(formattedDate);
                }}
            >
                <img src="/assets/star.svg" className="ml-5 mr-1" width="30" height="30" />
                <div className="flex flex-col text-white font-medium text-2xl">
                    <div className='flex flex-col'>
                        <div
                            className='flex  p-[6px] cursor-pointer'
                        >
                            <span>Due Today</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="flex transition-all duration-300 hover:bg-[#3AA7FA]"
                onClick={() => {
                    const today = new Date();
                    const formattedDate = today.toLocaleDateString();
                    handleSetFilterTaskTimeStamp(formattedDate);
                }}
            >
                <img src="/assets/star.svg" className="ml-5 mr-1" width="30" height="30" />
                <div className="flex flex-col text-white font-medium text-2xl">
                    <div className='flex flex-col'>
                        <div
                            className='flex  p-[6px] cursor-pointer'
                        >
                            <span>Created Today</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="flex transition-all duration-300 hover:bg-[#3AA7FA]"
                onClick={() => {
                    const today = new Date();
                    const formattedDate = today.toLocaleDateString();
                    handleSetFilterTaskAlarm(formattedDate);
                }}
            >
                <img src="/assets/star.svg" className="ml-5 mr-1" width="30" height="30" />
                <div className="flex flex-col text-white font-medium text-2xl">
                    <div className='flex flex-col'>
                        <div
                            className='flex  p-[6px] cursor-pointer'
                        >
                            <span>Alarms Today</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FilterInterface;