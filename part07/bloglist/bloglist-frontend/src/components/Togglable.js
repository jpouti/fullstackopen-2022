import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideVisible = { display: visible ? "none" : "" };
  const showVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  Togglable.displayName = "Togglable";

  return (
    <div>
      <div style={hideVisible}>
        <button onClick={toggleVisibility}>{props.showButton}</button>
      </div>
      <div style={showVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
