import { useState } from "react";


function HealthBar(props){
    const {maxHealth} = props;
    const [currentHealth, SetCurrentHealth] = useState(maxHealth? maxHealth : 0)

    function UpdateHealth(amount)
    {
        let newHealth = currentHealth + amount;
        if(newHealth>maxHealth)
            newHealth = maxHealth;
        if(newHealth<0)
            newHealth = 0
        SetCurrentHealth(newHealth);
    }

    return(
    <>
        <br />

        <p>Health: {currentHealth}</p>

        <br />
        
        <button 
        className={``} 
        onClick={()=>{UpdateHealth(10)}}
        >
            Heal
        </button>
        
        <button 
        className={``} 
        onClick={()=>{UpdateHealth(-10)}}
        >
            Take Damage
        </button>
    </>
    )


}

export default HealthBar;