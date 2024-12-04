import React, { useState, useEffect } from "react";
import axios from "axios";
import './Chatbox.css'; // Import the CSS file

import './TodoPage.css'; // Add styles for the search bar if needed

const ChatBox = ({ 
    handleCreateTaskAi,
    setCurrentList, 
    lists, 
    setLists
    }) => {
    // stuff for chatgpt
    const [taskList, setTaskList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    // stuff to create new list
    const [newListName, setNewListName] = useState("");

    //on startup explain how to use the ai chat
    useEffect(() => {
        const instructions = 
        {   sender: 
            "AI", 
            text: 
            `
            Hi! 
            `
        };
        setMessages([instructions]); // Initialize messages with the default AI message
        const moreInstructions = 
        {
            sender:
            "AI",
            text:
            `
            \nThen I will create a new list based off of that.
            \nI will also create all steps of that task split into numbered segments
            `
        }
        setMessages((prev) => [...prev, moreInstructions]);
    }, []);

    

    // sends a message to chatgpt and returns a response
    const sendMessage = async () => {
        // if empty message return nothing
        if (!newMessage.trim()) return;
        // if message does not start with how do i
        if(!newMessage.toLocaleLowerCase().startsWith("how do i")){
            const startErrorMsg = { sender: "AI", text: 'You must start your question with "How do i" '};
            setMessages((prev) => [...prev, startErrorMsg]);
            return;
        }
            
        // Adds the user's message to the chat
        const userMessage = { sender: "You", text: newMessage };
        // concats onto messages the users input
        setMessages((prev) => [...prev, userMessage]);
        setNewMessage("");
        setLoading(true);
    
        try {
            // send message to ai
            const response = await axios.post("http://localhost:8000/api/chat", 
            {
                message: newMessage,
            });

            const tasks = response.data.tasks || [];

            setTaskList(tasks);
            if (taskList.length > 0) {
                console.log("There are tasks in the task list:", taskList);
            } else {
                console.log("The task list is empty.");
            }
            

            for (const curList of lists) {
                console.log("List: ", curList)
            }
            
            // create a new list and add tasks to it based on the chatgpt response
            const listMsg = "List For: " + newMessage;
            for (const task of tasks) {
                try {
                    // Call handleCreateTaskAi for each task
                    // console.log("Task:",task);
                    // const thirdElement = task[2];
                    // console.log("Third Element: ", thirdElement);
                    const concatenatedString = task.join(" ");
                    // console.log("concatenatedString: ", concatenatedString);
                    await handleCreateTaskAi(concatenatedString, listMsg);
                } catch (error) {
                    console.error("Error going through tasks", error)
                }
            }
            setCurrentList(listMsg)
            
            // add ai reply to chat
            //const aiReply = { sender: "AI", text: response.data.reply };
            //setMessages((prev) => [...prev, aiReply]);
            // if error output console error and input error text into messages
        } catch (error) {
            console.error("Error communicating with AI:", error);
            const errorMessage = { sender: "AI", text: "Error please try again:" + error };
            setMessages((prev) => [...prev, errorMessage]);
            // Reset tasks in case of an error
            // no matter what set loading to false at end
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
    <div className="chat-container">
        <div>
            {messages.map((msg, index) => (
                <div key={index} className="message">
                <b>{msg.sender}: </b> {msg.text}
                </div>
            ))}
        </div>

        {taskList.length > 0 && (
            <div className="task-list">
                <h2>Tasks:</h2>
                <ul>
                    {taskList.map((task, index) => (
                        <li key={index}>{task}</li> // Render each task
                    ))}
                </ul>
            </div>
        )}
    
        <div className="input-container">
        <p>split into numbered tasks:</p>
        <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="How do I..."
            disabled={loading}
        />
        
        <button onClick={sendMessage} disabled={loading}>
            {loading ? "Generating" : "Send"}
        </button>
        
        </div>
    </div>
    );
};


export default ChatBox;
