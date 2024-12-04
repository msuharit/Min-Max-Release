import React from 'react';
import './ContextMenu.css'; // Import the CSS file

import { FaBell , FaCalendarAlt} from 'react-icons/fa';
import { FaEdit} from 'react-icons/fa';
import { HiMiniTrash } from "react-icons/hi2";
import { RiMarkPenFill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";

const ContextMenu = ({ top, left, onAction, isCompleted }) => (
    <div className="context-menu fade-in" style={{ position: 'absolute', top, left }}>
        <ul className="flex-row flex">

            <div className='flex-col flex'>
                <li onClick={() => onAction('edit')}>️
                    <FaEdit className='mr-2'/>

                    Edit</li>
                <li onClick={() => onAction('toggle')}>
                    <RiMarkPenFill className = 'mr-2'/>
                    {isCompleted ? 'Unmark' : 'Mark'}
                </li>
            </div>

            <div className='flex-col flex'>
            <li onClick={() => onAction('delete')}>
                <HiMiniTrash className = 'mr-2'/> Delete
            </li>

            <li onClick={() => onAction('alarm')}>
                <FaBell className = 'mr-2'/> Alarm
            </li>
            </div>

            <div className='flex-col flex'>
                <li onClick={() => onAction('due_date')}>
                    <FaCalendarAlt className = 'mr-2'/> Due Date
                </li>
                <li onClick={() => onAction('details')}>
                    <TbListDetails  className = 'mr-2'/> Details
                </li>
            </div>

        </ul>
    </div>
);
export default ContextMenu;