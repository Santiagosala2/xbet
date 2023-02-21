import Layout from "../../../components/Layout/Layout";
import { authCheck } from "../../api/auth";
import { getFriends, getUserData } from "../../api/user";
import { useRouter } from 'next/router'
import SearchBar from "../../../components/SearchBar/SearchBar";
import BetField from "../../../components/BetField/BetField";
import useBetField from "../../../hooks/useBetField";
import { ChangeEvent, useState } from "react";
import location from "../../../services/location";

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
  }
]

const weatherTypes = [

  {
    "name": "Sunshine",
    "emoji": "☀"
  },
  {
    "name": "Cloudy",
    "emoji": "☁"
  },
  {
    "name": "Rain",
    "emoji": "🌧"
  },
  {
    "name": "Thunder",
    "emoji": "⚡"
  },
  {
    "name": "Windy",
    "emoji": "🌫"
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
    handleSelectedValues
  ] = useBetField(false);

  const [results, setResults] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<string[]>([])

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

  const handleCloseModal = () => {
    setOpenModal(false);
    setFieldSelected("");
    setFilteredResults([]);
    setResults([]);
  }

  const handleSelectedField = (value: string) => {
    handleSelectedValues(fieldSelected, value);
    setOpenModal(false);
    setFieldSelected("");
    setFilteredResults([]);
    setResults([]);
  }

  const numberOfAddedValues = Object.values(selectedValues).filter(v => v !== "" ).length

  console.log(numberOfAddedValues)

  return (
    <Layout userBalance={data.balance}>
      <div className='flex items-center justify-center my-5' >
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 w-64">
          <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2 text-center" >{(typeof category) === 'string' && category ? category[0].toUpperCase() + category.slice(1) : ''}</label>
          <div className="flex flex-col gap-y-5 ">
            {
              weatherFields.map((f, i) => <BetField key={i} name={f.name} btnOnClick={wrapperSetOpenModal} emoji={f.emoji} value={selectedValues[f.name] as string} btnResetSelectedValueClick={handleSelectedValues} />)
            }
          </div>
          <div className="flex items-center justify-center">
            <button disabled={numberOfAddedValues !== weatherFields.length} type="button" className="mt-8 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300">Place bet</button>
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
            {(fieldSelected === "Location" || fieldSelected === "Friend") &&
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
          </div>

        </div>
      </div>}

    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const authCheckResponse = await authCheck(context.req);
  let data, friends;
  if (authCheckResponse.result) {
    data = await getUserData(context.req);
    friends = await getFriends(context.req);
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