

function CharacterInfo(props){
    const {name, characterClass, lvl, weapon} = props

    return(
        <>
            <div>
                <p>{name}, {characterClass}, {lvl}, {weapon}</p>
            </div>
        </>
    );  
}

export default CharacterInfo;