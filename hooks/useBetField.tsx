import { Dispatch, SetStateAction, useState} from 'react';

type ReturnBetField = [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    string,
    Dispatch<SetStateAction<string>>,
    (fieldName: string)=> void,
    any,
    (field:string,value: string) => void,
    () => void
]

const useBetField = (initialOpenModal : boolean): ReturnBetField => {
    const [openModal , setOpenModal] = useState(initialOpenModal);
    const [fieldSelected , setFieldSelected] = useState("");
    const [selectedValues , setSelectedValues] = useState({});

    function wrapperSetOpenModal (fieldName: string)  {
        setFieldSelected(fieldName);
        setOpenModal(true);
    }

    function handleSelectedValues (field:string,value: string) {
        const selectedValue = {[field]:value}
        setSelectedValues(selectedValues => ({
            ...selectedValues,
            ...selectedValue
        }))

    }

    function resetSelectedValues () {
        setSelectedValues([])
    }

    return [openModal,setOpenModal,fieldSelected,setFieldSelected,wrapperSetOpenModal,selectedValues,handleSelectedValues,resetSelectedValues]
}

export default useBetField;