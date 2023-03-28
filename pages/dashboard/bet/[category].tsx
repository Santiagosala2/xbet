import Layout from "../../../components/Layout/Layout";
import { authCheck } from "../../api/auth";
import { getFriends, getUserData } from "../../api/user";
import { useRouter } from 'next/router'
import SearchBar from "../../../components/SearchBar/SearchBar";
import BetField from "../../../components/BetField/BetField";
import useBetField from "../../../hooks/useBetField";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState , forwardRef, FunctionComponent } from "react";
import location from "../../../services/location";
import user from "../../../services/user"
import SuccessAlert from "../../../components/SuccessAlert/SuccessAlert";
import { weatherTypes } from "../../../constants/constants";

const weatherFields = [
  {
    "name": "When",
    "emoji": "❓"
  },
  {
    "name": "Location",
    "emoji": "🌍"
  },
  {
    "name": "Climate",
    "emoji": "☀🌧"
  },
  {
    "name": "Friend",
    "emoji": "🧑"
  },
  {
    "name": "Wager",
    "emoji": "💸"
  }
]

const manualFields = [
  {
    "name": "Name",
    "emoji": "📛"
  },
  {
    "name": "When",
    "emoji": "❓"
  },
  {
    "name": "Judge",
    "emoji": "👩‍⚖️"
  },
  {
    "name": "Friend",
    "emoji": "🧑"
  },
  {
    "name": "Wager",
    "emoji": "💸"
  }
]



const setDate = (add: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + add)
  return date.toLocaleDateString()
}


const whenOptions = [
  {
    "name": "Tomorrow",
    "calc": setDate()
  },
  {
    "name": "1 day",
    "calc": setDate(1)
  },
  {
    "name": "2 days",
    "calc": setDate(2)
  },
]

type InputFieldType = {
  type: string,
  arialLabel: string,
  placeHolder: string,
  btnOnClick: (value:any,ref:any) => void
}

const InputField = forwardRef<HTMLInputElement,InputFieldType>(({ type, arialLabel, placeHolder, btnOnClick },ref) => 
 (
        <>
          <div className="flex-auto  border rounded-md  border-slate-300 px-1">
            <input
              ref={ref}
              type={type}
              aria-label={arialLabel}
              className={`inline-block appearance-none text-slate-900 focus:outline-none text-sm`}
              placeholder={placeHolder}
    
            />
          </div>
          <button onClick={() => btnOnClick(ref,ref)} type="button" className="mt-8 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300">Add</button>
    
    
    
        </>
    
  )
)

InputField.displayName = "InputField"


type BetBody = {
  type: string,
  status: string,
  wager: number,
  name: string,
  location?: string,
  climate?: string,
  when: string,
  userEmail: string,
  friendEmail: string,
  judgeEmail: string,

}

function BetCategory({ data, friends }: any) {
  const router = useRouter()
  const { category } = router.query;
  const [
    openModal,
    setOpenModal,
    fieldSelected,
    setFieldSelected,
    wrapperSetOpenModal,
    selectedValues,
    handleSelectedValues,
    resetSelectedValues
  ] = useBetField(false);
  const lowerCaseCategory = typeof category === "string" ? category.toLocaleLowerCase() : category;
  const [categoryFields, setCategoryFields] = useState(lowerCaseCategory === "weather" ? weatherFields : lowerCaseCategory === "manual" ? manualFields : [])
  const [results, setResults] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const textInputRef = useRef<any>(null);
  const wagerInputRef = useRef<any>(null);
  const [noEnoughFunds, setNoEnoughFunds] = useState<boolean>(false);
  const [showAlert , setShowAlert] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const handleChangeOnSearch = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === "Location") {
      if (e.target.value.length === 1) {
        location.services.search({ country: "australia" }, (res: any) => {
          setResults(res.data);
          setFilteredResults(filterSearchResults(res.data, e.target.value))
        });
      }
      if (e.target.value.length > 1) {

        setFilteredResults(filterSearchResults(results, e.target.value))
      }

      return
    }
    if (e.target.value.length > 0) {
      setFilteredResults(filterSearchResults(friends.map((f: any) => f.firstName), e.target.value))
    }
  }

  const filterSearchResults = (results: string[], keyword: string) => {
    return results.filter(r => r.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
  }

  const resetState = () => {
    setOpenModal(false);
    setFieldSelected("");
    setFilteredResults([]);
    setResults([]);
    setNoEnoughFunds(false)
  }

  const handleCloseModal = () => {
    resetState()
  }

  const handleSelectedField = (value: string , ref?:any) => {
    handleSelectedValues(fieldSelected, ref !== undefined ? ref.current.value:value);
    resetState()

    if (ref !== undefined ) {
      if (ref.current) {
        ref.current.value = "";
      }
    }

    
  }

  
  const setTimer = (setter: Dispatch<SetStateAction<any>>) => {
    const timer = setTimeout(() => {
        setter(false);
    }, 3000);
    return () => clearTimeout(timer);
  }

  const mapProperties = () => {
    return { 
      type: lowerCaseCategory as string,
      status: "Pending",
      userEmail: data.email,
      friendEmail: friends.filter((f:any) => f.firstName === selectedValues.Friend)[0].email,
      judgeEmail: lowerCaseCategory === "manual" ? friends.filter((f:any) => f.firstName === selectedValues.Judge)[0].email : "",
      wager: Number(selectedValues.Wager),
      name: selectedValues.Name,
      when: selectedValues.When.split("-")[1].trim(),
      location: selectedValues.Location,
      climate: selectedValues.Climate


    }

  }


  const handlePlaceBet = () => {
       user.services.createBet<BetBody>(mapProperties() ,(res:any) => {
        setOpenModal(true);
        setShowSuccess(true);
        setShowAlert(true);
        setTimer(setShowAlert);
        resetSelectedValues()

       })
  }

  const numberOfAddedValues = Object.values(selectedValues).filter(v => v !== "").length

  return (
    <Layout userBalance={data.balance}>
      <div className='flex items-center justify-center my-5' >
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 w-64">
          <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2 text-center" >{(typeof category) === 'string' && category ? category[0].toUpperCase() + category.slice(1) : ''}</label>
          <div className="flex flex-col gap-y-5 ">
            {
              categoryFields.map((f, i) => <BetField key={i} name={f.name} btnOnClick={wrapperSetOpenModal} emoji={f.emoji} value={selectedValues[f.name] as string} btnResetSelectedValueClick={handleSelectedValues} />)
            }
          </div>
          <div className="flex items-center justify-center">
            <button disabled={numberOfAddedValues !== categoryFields.length} type="button" onClick={handlePlaceBet} className="mt-8 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300">Place bet</button>
          </div>
        </div>
      </div>
      {openModal && <div className="fixed top-0 left-0 right-0 w-full h-full z-50 ">
        <div className="relative w-full h-full bg-black/[0.2]">
          <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 w-1/4 m-auto top-40">
            <div className="flex">
              <button type="button" onClick={handleCloseModal} className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2" >{fieldSelected}</label>
            {(fieldSelected === "Location" || fieldSelected === "Friend" || fieldSelected === "Judge") &&
              <>
                <SearchBar inputName={fieldSelected} onChange={(e) => handleChangeOnSearch(e, fieldSelected)} />
                <div className="mt-4 flex flex-col gap-y-2" >
                  {filteredResults.slice(0, 5).map(c => (
                    <div
                      key={c}
                      onClick={() => handleSelectedField(c)} className="bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 cursor-pointer">
                      <p className="p-2 text font-semibold tracking-tight text-slate-900">{c}</p>
                    </div>
                  ))}
                </div>
              </>
            }
            {(fieldSelected === "Climate") &&
              <>
                {weatherTypes.map(t => (
                  <div key={t.name} className="w-fit p-4 bg-white border border-slate-900 rounded-lg shadow  inline-block my-2 mr-4 cursor-pointer" onClick={() => handleSelectedField(t.name)}>
                    {`${t.name} ${t.emoji}`}
                  </div>)

                )}

              </>
            }
            {(fieldSelected === "When") &&
              <>
                {whenOptions.map(w => (
                  <div key={w.name} className="w-fit p-4 bg-white border border-slate-900 rounded-lg shadow  inline-block my-2 mr-4 cursor-pointer" onClick={() => handleSelectedField(`${w.name} - ${w.calc}`)}>
                    {w.name}
                  </div>
                ))}

              </>

            }
            {(fieldSelected === "Name") &&
              <>
                <InputField
                  ref={textInputRef}
                  type={"text"}
                  arialLabel={"Name"}
                  placeHolder={"Add name"}
                  btnOnClick={handleSelectedField}
                />
              </>
            }
            {(fieldSelected === "Wager") &&
              <>
                <InputField
                  ref={wagerInputRef}
                  type={"number"}
                  arialLabel={"Wager"}
                  placeHolder={"Add wager"}
                  btnOnClick={() => {
                    if (wagerInputRef.current.value > data.balance ) return setNoEnoughFunds(true)
                    return handleSelectedField(wagerInputRef.current.value,wagerInputRef)
                  }}
                />

                {noEnoughFunds && 
                  <>
                    <label className="block text-xs font-semibold leading-6 text-rose-500" >No enough funds</label>
                  </>
                  
                }
              </>
            }
            {showSuccess &&
               <>  
                   
                  <button onClick={() => router.push('/dashboard')} type="button" className="mt-8 mb-4 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300">Go back to dashboard</button>
                  { showAlert && <SuccessAlert message="Bet has been created successfully"/>}
               
               </>

            }
          </div>

        </div>
      </div>}

    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const { query } = context
  if (query.category.toLocaleLowerCase() !== "manual" && query.category.toLocaleLowerCase() !== "weather") {
    return {
      notFound: true, //redirects to 404 page
    };
  }

  const authCheckResponse = await authCheck(context.req);
  let data, friends;
  if (authCheckResponse.result) {
    data = await getUserData(context.req);
    friends = await getFriends(context.req);
    console.log(friends)
  } else {


    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  // Pass data to the page via props
  return { props: { data, friends } }
}
export default BetCategory;