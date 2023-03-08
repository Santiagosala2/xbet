import {getUserData} from '../api/user'
import {authCheck} from '../api/auth'
import NavBar from '../../components/NavBar/NavBar';
import Layout from '../../components/Layout/Layout';
import { useState } from 'react';
import Card from '../../components/Card/Card';
import { useRouter } from 'next/router';


function Dashboard({data}:any) { 
    const router = useRouter();
    const [initialBalance, setInitialBalance] = useState(data.balance);
    return (
        <Layout userBalance={initialBalance}>
           <div className='m-7'>
              <h5 className='text-2xl text-slate-900 my-2' >Welcome! {data.firstName}</h5>
              <h2 className="text-4xl font-bold text-slate-900 mt-14">Make a bet</h2>
              <Card name='Weather' path='/weatherIcon.svg' onClick={() => router.push('/dashboard/bet/weather')}/>
              <Card name='Manual' path='/manualIcon.svg' onClick={() => router.push('/dashboard/bet/manual')} />
              <h2 className="text-4xl font-bold text-slate-900 mt-14">Pending bets</h2>
              
            </div>    
        </Layout> 
    )
}

export async function getServerSideProps(context:any) {
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

export default Dashboard;