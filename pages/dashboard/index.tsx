import {getUserData} from '../api/user'
import {authCheck} from '../api/auth'
import NavBar from '../../components/NavBar/NavBar';
import Layout from '../../components/Layout/Layout';
import { useState } from 'react';


function Dashboard({data}:any) {
    const [initialBalance, setInitialBalance] = useState(data.balance);
    return (
        <Layout userBalance={initialBalance}>
           <div className='text-black mx-4' >Welcome! {data.firstName}</div>
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