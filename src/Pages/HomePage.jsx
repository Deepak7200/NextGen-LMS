import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomePageImage from "../Assets/Images/homePageMainImage.png"
import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/Authorization";

function HomePage() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
    
    const handleDemoLogin = async (role) => {
        try {
            let credentials;

            if (role === "admin") {
                credentials = {
                email: "admin@mail.in",
                password: "#123Admin",
                };
            }

            if (role === "user") {
                credentials = {
                email: "user@mail.in",
                password: "#123User",
                };
            }

            await dispatch(login(credentials)).unwrap();
            navigate("/");
        } 
        catch (err) {
            console.error(err);
        }
    }
    
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    return(
        <HomeLayout>
            <div className="pt-7 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
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
                                    <td className="px-2 py-1 rounded-sm bg-blue-500 font-semibold">Demo Access</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td> Login as Admin </td>
                                    <td></td>
                                    <td>
                                       <button
                                            className="w-28 px-5 py-2 rounded-md font-semibold text-sm 
                                            bg-gradient-to-r from-yellow-500 to-yellow-400 
                                            text-black shadow-md 
                                            hover:from-yellow-400 hover:to-yellow-300 
                                            hover:shadow-yellow-500/40 hover:shadow-lg 
                                            transition-all duration-300"
                                            type="button"
                                            onClick={() => handleDemoLogin("admin")}
                                            >
                                            Admin
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Login as User </td>
                                    <td></td>
                                    <td>
                                        <button
                                            className="w-28 px-5 py-2 rounded-md font-semibold text-sm 
                                            bg-gradient-to-r from-blue-600 to-blue-500 
                                            text-white shadow-md 
                                            hover:from-blue-500 hover:to-blue-400 
                                            hover:shadow-blue-500/40 hover:shadow-lg 
                                            transition-all duration-300"
                                            type="button"
                                            onClick={() => handleDemoLogin("user")}
                                            >
                                            User
                                        </button>
                                    </td>
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