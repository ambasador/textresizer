import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

const TextResizer = ({
  defaultFont,
  step,
  min,
  max,
  suffix,
  store,
  storeKey
}) => {
  const [fontSize, setFontSize] = useState(defaultFont);

  const toggle = (type) => {
    let newFontSize = fontSize;
    switch (type) {
      case "increase":
        newFontSize += step;
        break;
      case "decrease":
        newFontSize -= step;
        break;
      default:
        newFontSize = defaultFont;
        break;
    }
    setFontSize(newFontSize);
    store.setItem(storeKey, newFontSize);
  };

  useEffect(() => {
    const storedValue = store.getItem(storeKey);
    if (storedValue) {
      const size = +storedValue;
      if (Number.isSafeInteger(size)) {
        setFontSize(+storedValue);
      }
    }
  }, [store, storeKey]);

  return (
    <Fragment>
      <button disabled={fontSize <= min} onClick={() => toggle("decrease")}>
        decrease
      </button>
      <button onClick={() => toggle("default")}>default</button>
      <button disabled={fontSize >= max} onClick={() => toggle("increase")}>
        increase
      </button>
      <style>{`html { font-size: ${fontSize}${suffix} }`.trim()}</style>
    </Fragment>
  );
};
TextResizer.propTypes = {
  defaultFont: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  suffix: PropTypes.string,
  store: PropTypes.object,
  storeKey: PropTypes.string
};
TextResizer.defaultProps = {
  defaultFont: 100,
  step: 20,
  min: 60,
  max: 180,
  suffix: "%",
  store: localStorage,
  storeKey: "TextResizer"
};
export default TextResizer;