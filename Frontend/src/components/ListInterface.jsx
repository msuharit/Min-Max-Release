import React, { useState } from 'react';
import './ContextMenu.css';
import { FaFolderOpen } from "react-icons/fa6";
import { SiHomeassistant } from "react-icons/si";

const ListInterface = ({currentList, setCurrentList, lists, setLists}) => {
    const [newListName, setNewListName] = useState("");

    const addList = () => {
        if (newListName.trim() !== "") {
            setLists([...lists, newListName]);
            setNewListName("");
        }
    };

    return (
        <div className="flex flex-col text-white font-medium text-2xl">

            <div className='flex flex-col'>
                {lists.map((list) => (
                    list !== 'Tasks' && (
                        <div 
                            className='flex transition-all duration-300 hover:bg-[#3AA7FA] p-[6px] cursor-pointer'
                            onClick={() => setCurrentList(list)} 
                        >
                            <FaFolderOpen className="ml-5 mr-3 mt-[5px]" />
                            <span>{list}</span>  
                        </div>
                    )
                ))}
                <div 
                    className='flex transition-all duration-300 hover:bg-[#3AA7FA] p-[6px] cursor-pointer' 
                    onClick={() => setCurrentList("Tasks")}
                >
                    <SiHomeassistant className="ml-5 mr-3 mt-[5px]" />
                    <span>Tasks</span> 
                </div>
            </div>

            <div className="flex mt-4 text-black">
                <input
                    type="text"
                    placeholder="Add new list"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="bg-transparent text-white p-2 outline-none focus:outline-none w-full ml-5"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addList();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ListInterface;
