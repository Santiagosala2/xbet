import { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import SuccessAlert from "../../../components/SuccessAlert/SuccessAlert";
import user from "../../../services/user";
import { authCheck } from "../../api/auth";
import { getUserData } from "../../api/user";

type Deposit = {
  amount: number,
  paymentProvider: string
}

function Wallet({ data }: any) {
  const [deposit, setDeposit] = useState<number>(0);
  const [balance, setBalance] = useState(0);
  const [initialBalance, setInitialBalance] = useState(data.balance);
  const [showSuccessDepositAlert , setShowSuccessDepositAlert] = useState(false);


  const handleDeposit = () => {
      const depositObj = {
        amount: deposit,
        paymentProvider: 'Paypal'
      }
      user.services.deposit<Deposit>(depositObj, (res) => {
        setBalance(res.balance);
        setInitialBalance(res.balance);
        setShowSuccessDepositAlert(true);
        setDeposit(0);
        const timer = setTimeout(() => {
          setShowSuccessDepositAlert(false);
          }, 3000);
         return () => clearTimeout(timer);
      })
  }

  return (
    <Layout userBalance={initialBalance}>
      <div className='flex items-center justify-center my-5' >
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
          {/* <label className="block text-sm font-semibold leading-6 text-gray-900" >Balance {balance > 0 ? balance : data.balance}</label> */}
          <label className="block text-sm font-semibold leading-6 text-gray-900" >Amount</label>
          <input
            type={"number"}
            min={"1"}
            step={"any"}
            aria-label={"Deposit"}
            placeholder={"Min. $1.00"}
            value={deposit > 0 ? deposit : ""}
            className={`appearance-none text-slate-900 bg-white rounded-md block shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-400 my-2`}
            onChange={e => setDeposit(parseFloat(e.target.value))}
          />
          <button type="button" className="rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-slate-900 text-white hover:bg-slate-700 my-3" onClick={handleDeposit}>Deposit</button>
        </div>
      </div>
      { showSuccessDepositAlert &&
      <SuccessAlert message="Deposit has been added to your account"/>
      }
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const authCheckResponse = await authCheck(context.req);
  let data;
  if (authCheckResponse.result) {
    data = await getUserData(context.req);
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default Wallet;