import { css } from "@emotion/react";
import { RefObject, useEffect, useRef, useState } from "react";

export default function LabeledInput(props: {
  placeholder?: string;
  name?: string;
  state?: number;
  type?: string;
  autoComplete?: string;
  _ref?: RefObject<HTMLInputElement>;
  value?: string | number;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const repRef = useRef<HTMLInputElement>(null);

  const inputFocused = () => {
    setIsInputFocused(true);
  };

  const inputBlured = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if ((props._ref || repRef)?.current?.matches(":autofill")) {
        (props._ref || repRef)?.current?.focus();
      }
    }, 500);
  }, []);

  return (
    <div
      onClick={(e) => {
        e.currentTarget.querySelector("input")?.focus();
      }}
      css={css`
        border: solid ${props.state === 0 ? "0" : "1px"} rgba(0, 0, 20, 0.1);
        ${props.state === 1 && "border-top: none;"}
        position: relative;
        border-radius: ${props.state === -1
          ? "10px 10px 0 0"
          : props.state == 1
            ? "0 0 10px 10px"
            : "10px"};
        width: 100%;
        height: ${props.state === 0 ? "0" : "70px"};
        overflow: hidden;
        width: calc(100% - 40px);
        margin-left: 20px;
        overflow: hidden;
        transition-duration: 0.15s;
      `}
    >
      <div
        css={
          isInputFocused ||
          (props.value === undefined ? inputValue : props.value.toString())
            ? css`
                position: absolute;
                font-size: 14px;
                color: rgba(0, 0, 20, 0.6);
                margin-left: 12px;
                margin-top: 6px;
                line-height: 28px;
                transition-duration: 0.15s;
              `
            : css`
                position: absolute;
                font-size: 18px;
                color: rgba(0, 0, 20, 0.4);
                margin-left: 12px;
                margin-top: 0px;
                line-height: 70px;
                transition-duration: 0.15s;
              `
        }
      >
        {props.placeholder}
      </div>
      <input
        type={props.type || "text"}
        name={props.name}
        value={props.value === undefined ? inputValue : props.value}
        autoComplete={props.autoComplete}
        aria-autocomplete="list"
        required
        onFocus={inputFocused}
        onBlur={inputBlured}
        onChange={(e) => {
          props.onChange && props.onChange(e);
          setInputValue(e.currentTarget.value);
        }}
        ref={props._ref}
        css={css`
          background: none !important;
          border: none;
          border-radius: 10px 10px 0 0;
          height: 70px;
          width: 100%;
          padding: 14px;
          padding-top: 30px;
          font-size: 18px;
          border-radius: 0;
          outline: 0;
        `}
      />
    </div>
  );
}
