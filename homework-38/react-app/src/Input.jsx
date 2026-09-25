import { useState } from "react";

export default function Input(props){
 const {text} = props;
 const [value, setValue] = useState("")
 const OnInputChange = (event) => {
    let data = event.target.value;
    setValue(data);
 }

 return (
    <>
      <input
        type="text"
        value={value}
        placeholder={text}
        onChange={OnInputChange}
      />

      <p>Ты ввёл: {value}</p>
    </>
  );
}