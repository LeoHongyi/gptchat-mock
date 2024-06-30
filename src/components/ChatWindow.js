
import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import Suggestion from './Suggestion';
import useChatStream from '../hooks/useChatStream';
import { Circles } from 'react-loader-spinner';
import './ChatWindow.css';

/**
 * 定义一个聊天窗口组件。
 * 
 * 该组件展示了聊天消息，并提供了一个输入框用于用户输入消息。
 * 支持自动完成建议功能，并在消息发送后清空输入框。
 */
const ChatWindow = () => {
  // 状态用于存储用户输入的文本
  const [inputText, setInputText] = useState('');
  // 状态用于存储自动完成的建议列表
  const [suggestions, setSuggestions] = useState([]);

  // 使用useChatStream钩子获取聊天流中的消息、发送消息的函数以及加载状态
  const { messages, sendMessage, loading } = useChatStream();

  // 预定义的建议列表，用于实现自动完成功能
  const predefinedSuggestions = [
      'Hello',
      'How are you?',
      'Tell me a joke',
      'What is the weather like?',
      'What is your name?',
      'Can you help me?',
  ];

  /**
   * 处理输入框文本变化的函数。
   * 根据当前输入文本更新建议列表。
   * 
   * @param {string} text 用户输入的文本
   */
  const handleInputChange = (text) => {
      setInputText(text);
      if (text) {
          setSuggestions(
              predefinedSuggestions.filter((suggestion) =>
                  suggestion.toLowerCase().includes(text.toLowerCase())
              )
          );
      } else {
          setSuggestions([]);
      }
  };

  /**
   * 处理建议选择的函数。
   * 将选择的建议设置为输入框文本，并发送该消息。
   * 
   * @param {string} suggestion 用户选择的建议
   */
  const handleSuggestionSelect = (suggestion) => {
      setInputText(suggestion);
      setSuggestions([]);
      sendMessage(suggestion);
  };

  /**
   * 处理消息提交的函数。
   * 如果消息不为空，则发送消息并清空输入框。
   * 
   * @param {string} message 用户输入的消息
   */
  const handleSubmit = (message) => {
      if (message.trim()) {
          sendMessage(message);
          setInputText('');
      }
  };

  // 返回聊天窗口的UI，包括聊天消息列表和输入框组件
  return (
      <div className="chat-window">
          <div className="chat-messages">
              {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
              ))}
              {loading && (
                  <div className="loading">
                      <Circles color="#00BFFF" height={40} width={40} />
                  </div>
              )}
          </div>
          <div className="input-container">
              <Suggestion suggestions={suggestions} onSelect={handleSuggestionSelect} />
              <ChatInput
                  sendMessage={handleSubmit}
                  initialText={inputText}
                  onInputChange={handleInputChange}
              />
          </div>
      </div>
  );
};

export default ChatWindow;