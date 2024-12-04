import React, { useEffect, useState } from 'react';
import { readTasksByDay } from '../api';
import './TaskCompletionRateForDays.css'; 

const TaskCompletionRateForDays = ({ uid }) => {
    const [completedDays, setCompletedDays] = useState([]);
    const [totalDays, setTotalDays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompletedDays = async () => {
            const today = new Date();
            const daysToCheck = [];

            for (let i = 0; i < 30; i++) {
                const day = new Date(today);
                day.setDate(today.getDate() - i);
                daysToCheck.push(day.toISOString().split('T')[0]); 
            }

            let completedCount = 0;
            let totalCount = 0;

            for (const day of daysToCheck) {
                const { allTasksCompleted, totalTasks, completedTasks } = await readTasksByDay(uid, day);

                if (allTasksCompleted) {
                    completedCount++;
                }
                totalCount++;
            }

            setCompletedDays(completedCount);
            setTotalDays(totalCount);
            setLoading(false);
        };

        fetchCompletedDays();
    }, [uid]);

    if (loading) return <div>Loading...</div>;

    const completionRate = totalDays ? (completedDays / totalDays) * 100 : 0;

    return (
        <div>
            <h3>Task Completion Rate for Days with All Tasks Completed</h3>
            <p>
                {completedDays} out of {totalDays} days have all tasks completed.
            </p>
            <p>Completion Rate: {completionRate.toFixed(2)}%</p>
        </div>
    );
};

export default TaskCompletionRateForDays;
