import { useEffect, useState } from 'react'

interface User {
    ID: string;
    FirstNameLastName: string;
    Company: string;
    JobTitle: string;
    Email: string;
}

const Pagination = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [nextSize, setNextSize] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchUsers = async () => {
        const res = await fetch(`https://give-me-users-forever.vercel.app/api/users/${page + nextSize}/next`);
        const data = await res.json();
        console.log(data);
        if (data && data.users) {
            setUsers(data.users);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [page, nextSize]);

    return (
        <div className='flex flex-col select-none'>
            {users.length > 0 && (
                <div className='flex flex-col justify-center'>
                    {users.map((item) => (
                        <div key={item.ID} className='flex flex-col justify-center p-3 m-2 cursor-pointer gap-2'>
                            <div className='flex gap-3'>
                                <div className='font-normal text-gray-600'>ID: <span className='text-black font-bold'>{item.ID}</span>,</div>
                                <div className='font-normal text-gray-600'>Name: <span className='text-black font-bold'>{item.FirstNameLastName},</span></div>
                                <div className='font-normal text-gray-600'>Company: <span className='text-black font-bold'>{item.Company}</span>,</div>
                                <div className='font-normal text-gray-600'>Job Title: <span className='text-black font-bold'>{item.JobTitle},</span></div>
                                <div className='font-normal text-gray-600'>Email: <span className='text-black font-bold'>{item.Email}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {users.length > 0 && (
                <div className='flex gap-3 self-center'>
                    <span className='cursor-pointer h-12 w-12 flex items-center justify-center border border-gray-400' onClick={() => {
                        console.log("current page - ", page);
                        if (page % 5 === 0 && page !== 0) {
                            console.log("total page - ", totalPages);
                            console.log("setting total page to -", totalPages - 5);
                            setTotalPages(prev => prev - 5);
                        }
                        if (page !== 0) {
                            console.log("setting current page to - ", page - 1);
                            console.log("current next size - ", nextSize);
                            console.log("setting next size to  - ", nextSize - 9);
                            setPage(prev => prev - 1);
                            setNextSize(prev => prev - 9);
                        }
                    }}>◀️</span>

                    {[...Array(5)].map((_, i) => (
                        <span key={i}
                            className={`border border-gray-400 h-12 w-12 flex items-center justify-center cursor-pointer ${i + totalPages === page ? "bg-blue-600 text-white" : "text-gray-400"}`}
                            onClick={() => {
                                console.log("current page - ", page);
                                console.log("setting current page to - ", i + totalPages);
                                console.log("current next size - ", nextSize);
                                console.log("setting next size to  - ", (i + totalPages) * 9);
                                setPage(i + totalPages);
                                setNextSize((i + totalPages) * 9);
                            }}>
                            {i + totalPages + 1}
                        </span>
                    ))}

                    <span className='cursor-pointer border border-gray-400 h-12 w-12 flex items-center justify-center' onClick={() => {
                        console.log("setting current page to - ", page + 1);
                        console.log("current next size - ", nextSize);
                        console.log("setting next size to  - ", nextSize + 9);
                        setPage(prev => prev + 1);
                        setNextSize(prev => prev + 9);
                        if ((page + 1) % 5 === 0 && page !== 0) {
                            console.log("total page - ", totalPages);
                            console.log("setting total page to -", totalPages + 5);
                            setTotalPages(prev => prev + 5);
                        }
                    }}>▶️</span>
                </div>
            )}
        </div>
    );
}

export default Pagination;
