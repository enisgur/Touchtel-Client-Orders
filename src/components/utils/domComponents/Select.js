import React, { useState, useEffect } from "react";

const Select = (props) => {
  const {
    name,
    datas,
    callback,
    isDetail = false,
    disabled,
    selected = false,
  } = props;

  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (
      isDetail &&
      selected !== undefined &&
      selected &&
      disabled !== undefined
    ) {
      setIsDisabled(disabled);
      return setValue(selected);
      // callback(name, selected)
    }

    if (!isDetail && !selected && datas[0] && datas[0]._id && name) {
      const val = datas[0]._id;

      setValue(val);
      callback(name, val);
    }
    // eslint-disable-next-line
  }, [datas, name, selected, isDetail, disabled]);

  const onChane = (e) => {
    setValue(e.target.value);
    callback(name, e.target.value);
  };

  return (
    <select
      name={name}
      id={name}
      disabled={isDisabled}
      onChange={(e) => onChane(e)}
      value={value}
    >
      {datas.map((data) => {
        let optionValue = data.company
          ? data.company
          : data.name
          ? data.name
          : "";

        return (
          <option key={data._id} value={data._id}>
            {optionValue}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
