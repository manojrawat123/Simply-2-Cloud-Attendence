const genrateInitalValues = (inputArr)=>{
    let initialValues = {};

    inputArr.forEach(element => {
    
        if(element.type == "array"){
            initialValues[element.name] = []
        }
        else{
            initialValues[element.name] = ""
        }

        if (element.value != "" && !element.value){
            initialValues[element.name] = ""
        }
        else{
            if (element.value.value){
                initialValues[element.name] = element.value.value
            }
            else{
                initialValues[element.name] = element.value
            }
        }
    });

    return initialValues;
}

export default genrateInitalValues;