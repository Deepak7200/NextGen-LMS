import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomePageImage from "../Assets/Images/homePageMainImage.png"
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    return(
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">
                        Find out best
                        <span className="text-yellow-500 font-bold"> Online Courses </span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    {!isLoggedIn && 
                        <table className="border-2 border-blue-500 rounded-lg border-separate border-spacing-y-3 p-2">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td className="p-1 rounded-sm bg-blue-500"> Demo Accounts </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td> admin@mail.in </td>
                                    <td></td>
                                    <td> #123Admin </td>
                                </tr>
                                <tr>
                                    <td> user@mail.in </td>
                                    <td></td>
                                    <td> #123User </td>
                                </tr>
                            </tbody>
                        </table>
                    }                    


                    <div className="space-x-6">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 ">
                                Explore Courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 ">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <img src={HomePageImage} alt="homepage image" />
                </div>
            </div>
        </HomeLayout>
    );
} 
export default HomePage;    