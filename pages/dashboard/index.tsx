import { getBets, getUserData } from '../api/user'
import { authCheck } from '../api/auth'
import NavBar from '../../components/NavBar/NavBar';
import Layout from '../../components/Layout/Layout';
import { useState } from 'react';
import Card from '../../components/Card/Card';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { weatherTypes } from '../../constants/constants';

const formatDate = (value: string) => {
  const d = new Date(value)
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${da}/${mo}/${ye}`
}

const weatherPendingBetKeys = [{ key: "betID", name: "Bet Id" }, { key: "type", name: "Type" }, { key: "status", name: "Status" }, { key: "when", name: "When" }, { key: "location", name: "Location" }, { key: "climate", name: "Answer (Climate)" }, { key: "friendName", name: "Friend" }, { key: "wager", name: "Wager" }];
const manualPendingBetKeys = [{ key: "betID", name: "Bet Id" }, { key: "type", name: "Type" }, { key: "status", name: "Status" }, { key: "when", name: "When" }, { key: "judgeName", name: "Judge" }, { key: "friendName", name: "Friend" }, { key: "wager", name: "Wager" }]

const weatherAwaitingBetKeys = [{ key: "betID", name: "Bet Id" }, { key: "wager", name: "Wager" },{ key: "when", name: "When" }, { key: "location", name: "Location" }, { key: "friendName", name: "Friend" }]

type ModalState = "pending" | "awaiting";



function Dashboard({ data, bets }: any) {
  const router = useRouter();
  const [initialBalance, setInitialBalance] = useState(data.balance);
  const [selectedBet, setSelectedBet] = useState<any | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [betKeys, setBetKeys] = useState<any[]>([])
  const [currentBetModalState, setCurrentBetModalState] = useState<ModalState>()
  const [climateAnswer, setClimateAnswer] = useState<any>(null)

  const selectedClimateAnswerClass = "border-green-500"

  const handleOpenDetailsModal = (bet: any, state: ModalState) => {
    setOpenDetailsModal(true);
    handleModalStateChange(state);
    if (state === "pending") {
      if (bet.type === "weather") {
        setBetKeys(weatherPendingBetKeys)
      } else {
        setBetKeys(manualPendingBetKeys)
      }
    }

    if (state === "awaiting") {
      if (bet.type === "weather") {
        setBetKeys(weatherAwaitingBetKeys)
      } 
    }
    setSelectedBet(bet);
  }

  const handleCloseOpenDetailsModal = () => {
    setClimateAnswer(null)
    setOpenDetailsModal(false)
  };

  const handleModalStateChange = (state: ModalState) => {
    if (state !== currentBetModalState) {
      setCurrentBetModalState(state);
    }
  }

  return (
    <Layout userBalance={initialBalance}>
      <div className='m-7'>
        <h5 className='text-2xl text-slate-900 my-2' >Welcome! {data.firstName}</h5>
        <h2 className="text-4xl font-bold text-slate-900 mt-6">Make a bet</h2>
        <Card name='Weather' path='/weatherIcon.svg' onClick={() => router.push('/dashboard/bet/weather')} />
        <Card name='Manual' path='/manualIcon.svg' onClick={() => router.push('/dashboard/bet/manual')} />
        <h2 className="text-4xl font-bold text-slate-900 mt-6">Pending bets</h2>
        <div className='flex'>
          {bets.pending.map((b: any) => (
            <Card
              key={b.betID}
              name={b.betID}>
              <>
                <Image className="w-5 h-5 mb-2 text-slate-900" src={b.type == "weather" ? "/weatherIcon.svg" : "/manualIcon.svg"} alt={""} width={40} height={40} />
                <h5 className="mb-2 text-sm font-semibold tracking-tight text-slate-900">id: {b.betID}</h5>
                {/* <h5 className="mb-2 text-1xl font-semibold tracking-tight text-slate-900">Waiting {b.friendID}</h5> */}
                <h5 className="mb-2 text-sm font-semibold tracking-tight text-slate-900">{`for:${formatDate(b.when).trim()}`}</h5>
                <button type="button" className="mt-2 text-slate-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300" onClick={() => handleOpenDetailsModal(b, "pending")}>Details</button>


              </>

            </Card>)
          )}
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mt-6">Awaiting bets</h2>
        {bets.awaiting.map((b: any) => (
          <Card
            key={b.betID}
            name={b.betID}>
            <>
              <Image className="w-5 h-5 mb-2 text-slate-900" src={b.type == "weather" ? "/weatherIcon.svg" : "/manualIcon.svg"} alt={""} width={40} height={40} />
              <h5 className="mb-2 text-1xl font-semibold tracking-tight text-slate-900">Id: {b.betID}</h5>
              <h5 className="mb-2 text-sm font-semibold tracking-tight text-slate-900">{`for:${formatDate(b.when).trim()}`}</h5>
              <button type="button" className="mt-2 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300" onClick={() => handleOpenDetailsModal(b, "awaiting")}>Answer</button>
              {/* <h5 className="mb-2 text-1xl font-semibold tracking-tight text-slate-900">Waiting {b.friendID}</h5> */}



            </>

          </Card>)
        )}
        {openDetailsModal && <div className="fixed top-0 left-0 right-0 w-full h-full z-50 ">
          <div className="relative w-full h-full bg-black/[0.2]">
            <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 w-1/4 m-auto top-40">
              <div className="flex">
                <button type="button" className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal" onClick={handleCloseOpenDetailsModal}>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
              {betKeys.map(k =>
                <div key={k.key}>

                  <label className="block text-sm font-semibold leading-6 text-gray-900 mt-2" >{k.name}</label>
                  <div key={selectedBet[k.key]} className="flex-auto  border rounded-md  border-slate-300 px-1">{k.key === "when"? formatDate(selectedBet[k.key]).trim():selectedBet[k.key] }</div>
                </div>
              )}
              {currentBetModalState === "awaiting" &&
                <div className='my-2'>
                  <label className="block text-sm font-semibold leading-6 text-gray-900 mt-2" >Climate answer</label>
                  {weatherTypes.map(t => (
                    <div key={t.name} className={`w-fit p-4 bg-white border border-slate-900 rounded-lg shadow  inline-block my-2 mr-4 cursor-pointer ${t.name === climateAnswer ? selectedClimateAnswerClass: ''}`} onClick={() => setClimateAnswer(t.name)}>
                      {`${t.name} ${t.emoji}`}
                    </div>)

                  )}
                  <div className='flex justify-around'>

                  <button type="button" className="mt-2 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300" disabled={climateAnswer === null}>Accept</button>
                  <button type="button" className="mt-2 text-slate-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300" >Reject</button>

                  </div>



                </div>


              }
            </div>

          </div>
        </div>}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const authCheckResponse = await authCheck(context.req);
  let data, bets;
  if (authCheckResponse.result) {
    data = await getUserData(context.req);
    bets = await getBets(context.req);
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  // Pass data to the page via props
  return { props: { data, bets } }
}

export default Dashboard;