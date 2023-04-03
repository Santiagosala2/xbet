import { ChangeEvent, Dispatch, useState , SetStateAction } from "react";
import Layout from "../../../components/Layout/Layout";
import user from "../../../services/user";
import { authCheck } from "../../api/auth";
import { getUserData , getFriends } from "../../api/user";
import Image from 'next/image';
import { useRouter } from 'next/router'
import SuccessAlert from "../../../components/SuccessAlert/SuccessAlert";
import SearchBar from "../../../components/SearchBar/SearchBar";

type AddFriend = {
    toEmail: string,
    fromEmail: string
}

export type User = {
    friendshipId : number,
    email: string,
    firstName: string
    type: "Friend" | "Request" | "None" | "Pending"
}

function Friends({ data , friends }: any) {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [searchValue , setSearchValue] = useState<string>("");
    const [showAlert , setShowAlert] = useState<boolean>(false);

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            user.services.searchUsers(e.target.value, (res: User[]) => {
            setUsers(res);
            setSearchValue(e.target.value);
        });
        } 

        setUsers([]);
    }

    const handleAddFriend = (fromEmail : string) => {
        var addFriendObj: AddFriend = {
            fromEmail: data.email,
            toEmail: fromEmail
        }
        user.services.addFriend<AddFriend>( addFriendObj , (res) => {          
            user.services.searchUsers(searchValue, (res: User[]) => {
                setShowAlert(true);
                setTimer(setShowAlert);
                refreshData();
                return setUsers(res)
            });
        })
    }

    const handleAcceptRequest = (friendshipId : number ) => {
        user.services.acceptRequest<{ friendshipId : number}>( { friendshipId } , (res) => {          
            user.services.searchUsers(searchValue, (res: User[]) => {
                setShowAlert(true);
                setTimer(setShowAlert);
                refreshData();
                return setUsers(res)
            });
        })
    }

    const handleRejectRequest = (friendshipId : number ) => {
        user.services.rejectRequest<{ friendshipId : number}>( { friendshipId } , (res) => {          
            user.services.searchUsers(searchValue, (res: User[]) => {
                setShowAlert(true);
                setTimer(setShowAlert);
                setUsers(res)
            });
        })
    }

    const setTimer = (setter: Dispatch<SetStateAction<any>>) => {
        const timer = setTimeout(() => {
            setter(false);
        }, 3000);
        return () => clearTimeout(timer);
    }

    return (
        <Layout userBalance={data.balance}>
            <div className='flex items-center justify-center my-5' >
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
                    {/* <label className="block text-sm font-semibold leading-6 text-gray-900" >Balance {balance > 0 ? balance : data.balance}</label> */}
                    
                    <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2" >Friends</label>
                    <div className="flex gap-4 flex-wrap mb-4"> 
                           {friends.map((f: any) => (
                            <div key={f.email} className="w-16 h-16 rounded border border-gray-900">
                                <div className="h-full w-full flex justify-center items-center"><p className="text-sm">{f.firstName}</p></div>
                            </div>
                           ))

                           }
                            
                     </div>
                    {/* <button type="button" className="rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-slate-900 text-white hover:bg-slate-700 my-3" >Deposit</button> */}
                    <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2" >Find Friends</label>
                    <SearchBar inputName="Find Friends" onChange={(e) => handleChange(e)}/>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map(u => {
                                return (
                                <li className="py-3 sm:py-4" key={u.email}>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {/* <Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {u.firstName}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                               {u.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                        {(u.type == "Request" || u.type == "None") &&
                                             <button type="button" className="rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-slate-900 text-white hover:bg-slate-700 my-3 disabled:bg-slate-300" disabled={u.type == "Request"} onClick={() => handleAddFriend(u.email)}>
                                                {(u.type == "Request") ? "Sent" : "Add" }
                                            </button>
                                        }
                                        {u.type == "Friend" && 
                                                <p>Friend</p>
                                         
                                        }
                                        {u.type == "Pending" &&
                                            <div className="flex">
                                                <button type="button" className="rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-slate-900 text-white hover:bg-slate-700 my-3 disabled:bg-slate-300" onClick={() => handleAcceptRequest(u.friendshipId)}>
                                                   Accept
                                                </button>
                                                <button type="button" className="rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-white text-black hover:border-1.5 hover:border-black my-3 disabled:bg-slate-300" onClick={() => handleRejectRequest(u.friendshipId)}>
                                                   Reject
                                                </button>
                                            </div>}
                                        </div>
                                    </div>
                                </li>)
                            })

                            }

                        </ul>
                    </div>
                </div>
            </div>
            {showAlert &&
                <SuccessAlert message="Done"/>
            }
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    // Fetch data from external API
    const authCheckResponse = await authCheck(context.req);
    let data, friends;
    if (authCheckResponse.result) {
        data = await getUserData(context.req);
        friends = await getFriends(context.req)
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    // Pass data to the page via props
    return { props: { data , friends } }
}

export default Friends;