import React, { useState, useEffect, useRef, useCallback } from "react";
import useKeypress from "../../hooks/useKeypress";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "./style.scss";
export default function InlineEdit({ text, onSetText }) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      // save the value and close the editor
      onSetText(inputValue);
      setIsInputActive(false);
    }
  });
  const onEnter = useCallback(() => {
    if (enter) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(text);
      setIsInputActive(false);
    }
  }, [esc, text]);

  useEffect(() => {
    if (isInputActive) {
      onEnter();
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  return (
    <h3 className="inline-text" ref={wrapperRef}>
      <div ref={textRef} onClick={() => setIsInputActive(true)} className={`inline-text_copy inline-text_copy--${!isInputActive ? "active" : "hidden"}`}>
        {text}
      </div>
      <input
        value={inputValue}
        ref={inputRef}
        style={{ width: Math.ceil(inputValue.length * 1.5) + "ex" }}
        onChange={(e) => setInputValue(e.target.value)}
        className={`inline-text_input inline-text_input--${isInputActive ? "active" : "hidden"}`}
      />
    </h3>
  );
}
