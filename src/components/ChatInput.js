import React from 'react';
import useInputLineCalculation from '../hooks/useInputLineCalculation';

/**
 * ChatInput 组件用于渲染聊天输入框。
 * 它使用 useInputLineCalculation 钩子来根据输入内容管理输入框的高度。
 * 
 * @param {Object} props 组件的属性对象。
 * @param {Function} props.sendMessage 点击发送按钮时调用的发送消息函数。
 * @param {string} props.initialText 输入框的初始文本内容。
 * @param {Function} props.onInputChange 输入内容变化时触发的回调函数。
 * @returns 返回聊天输入表单组件。
 */
const ChatInput = ({ sendMessage, initialText, onInputChange }) => {
    // 使用 useInputLineCalculation 钩子来管理输入框的大小和引用。
    const { value, handleChange, inputRef } = useInputLineCalculation({
        initialValue: initialText, // 初始文本内容
        initialLines: 3,           // 初始高度为3行
        maxHeightLines: 8,         // 最大高度为8行
        lineHeight: 1.5,           // 行高，单位为em
    });

    /**
     * 处理表单提交事件。
     * 阻止默认的表单提交行为，并检查输入内容是否非空。
     * 若内容非空，则发送消息，重置输入内容，并触发onInputChange回调通知父组件。
     * 
     * @param {Object} e 表单提交的事件对象。
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            sendMessage(value);
            handleChange('');       // 重置文本区域的值
            onInputChange('');      // 通知父组件输入变化
        }
    };

    /**
     * 处理输入框内容变更事件。
     * 更新输入框的状态并触发onInputChange回调，传递新值。
     * 
     * @param {Object} e 输入内容变更的事件对象。
     */
    const onChange = (e) => {
        const newValue = e.target.value;
        handleChange(newValue);
        onInputChange(newValue);
    };

    /**
     * 处理粘贴事件。
     * 获取粘贴的文本内容，将其追加到当前输入内容，更新状态，并触发onInputChange回调。
     * 
     * @param {Object} e 粘贴的事件对象。
     */
    const handlePaste = (e) => {
        const pastedText = e.clipboardData.getData('Text');
        const newValue = value + pastedText;
        handleChange(newValue);
        onInputChange(newValue);
    };

    // 渲染表单组件，包含一个用于输入的文本域和一个发送按钮。
    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', height: 'auto', position: 'relative' }}>
            <textarea
                ref={inputRef}
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    resize: 'none',
                }}
                value={value}
                onChange={onChange}
                onPaste={handlePaste}
                placeholder="输入消息..."
            />
            <button type="submit" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>发送</button>
        </form>
    );
};

export default ChatInput;