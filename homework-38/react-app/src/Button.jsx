import { useState } from "react";
import './Button.css';

export default function Btn(props){

    const {oslik, paskudas, sixseven} = props;
    const [count, setCount] = useState(sixseven);
    const [cl, setCl] = useState('');
    const OnBtnClick = () =>{
        let innerPaskudas = paskudas ? paskudas : 1
        let oloh = count+innerPaskudas;
        setCount(oloh);
        if(oloh > 6677){
            setCl('green');
        }
    }

    return (
    <>
        <button 
        className={`counter ${cl}`} 
        onClick={OnBtnClick}
        >
           {oslik} sosal: {count} x
        </button>
    </>);
}