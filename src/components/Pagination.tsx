import { useEffect, useState } from "react";

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
        const res = await fetch(
            `https://give-me-users-forever.vercel.app/api/users/${page + nextSize
            }/next`
        );
        const data = await res.json();
        console.log(data);
        if (data && data.users) {
            setUsers(data.users);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, nextSize]);

    const handlePrev = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
            setNextSize((prev) => prev - 9);
            if (page % 5 === 0) {
                setTotalPages((prev) => prev - 5);
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleNext = () => {
        setPage((prev) => prev + 1);
        setNextSize((prev) => prev + 9);
        if ((page + 1) % 5 === 0) {
            setTotalPages((prev) => prev + 5);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
        setNextSize(pageNumber * 9);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col items-center select-none p-6 bg-gray-100 min-h-screen">
            {users.length > 0 && (
                <div className="w-full max-w-4xl">
                    {users.map((item) => (
                        <div
                            key={item.ID}
                            className="bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-md rounded-lg p-4 mb-4 transition-transform transform hover:scale-105 hover:shadow-lg border-t-4 border-blue-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="text-gray-700">
                                    <span className="font-bold text-blue-800">ID: </span>
                                    {item.ID}
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-bold text-blue-800">Name: </span>
                                    {item.FirstNameLastName}
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-bold text-blue-800">Company: </span>
                                    {item.Company}
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-bold text-blue-800">Job Title: </span>
                                    {item.JobTitle}
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-bold text-blue-800">Email: </span>
                                    {item.Email}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {users.length > 0 && (
                <div className="flex gap-2 mt-4">
                    <button
                        className={`cursor-pointer h-10 w-10 flex items-center justify-center border border-gray-400 rounded ${page === 0 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
                            }`}
                        onClick={handlePrev}
                        disabled={page === 0}
                    >
                        ◀️
                    </button>

                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`border border-gray-400 h-10 w-10 flex items-center justify-center cursor-pointer rounded ${i + totalPages === page
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600"
                                } ${page === i + totalPages
                                    ? "cursor-not-allowed"
                                    : "hover:bg-gray-200"
                                }`}
                            onClick={() => handlePageClick(i + totalPages)}
                        >
                            {i + totalPages + 1}
                        </span>
                    ))}

                    <button
                        className={`cursor-pointer border border-gray-400 h-10 w-10 flex items-center justify-center rounded ${users.length < 9
                                ? "cursor-not-allowed opacity-50"
                                : "hover:bg-gray-200"
                            }`}
                        onClick={handleNext}
                        disabled={users.length < 9}
                    >
                        ▶️
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pagination;