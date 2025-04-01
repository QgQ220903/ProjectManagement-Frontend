import React from 'react'
import { Link } from 'react-router-dom'
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logInAPI } from "@/services/AccountService";
import { getRolesAPI } from "@/services/RoleService";
import { useNavigate } from "react-router-dom";
import FormLogin from "@/components/form/Form";
import { useAuth } from "@/hooks/use-auth";
const Login = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { loadRoleUser, setAuth } = useAuth();  // Lấy hàm loadUserData từ context

    const { data: newData, mutate: mutatePost } = useMutation({
        mutationFn: logInAPI,
        onSuccess: (data) => {
            if (data) {
                setAuth(data);
                console.log("logInAPI",data)
                data.access && localStorage.setItem("access", data.access); // Lưu vào localStorageX
                data.refresh && localStorage.setItem("refresh", data.refresh); // Lưu vào localStorageX
                data.user && localStorage.setItem("auth", JSON.stringify(data.user)); // Lưu vào localStorageX
                loadRoleUser(data.user.role.id);

                navigate('/');
           
            }
    
         
            
        },
        onError: (error) => {
            console.log(error);
        },
    });


 

    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn reload trang

        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");

        // Gọi API đăng nhập
        mutatePost({ email, password });
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        TQT
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập bằng tài khoản của bạn
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="Post" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của bạn</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật Khẩu</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-blue-600">Quên mật khẩu ?</a>
                                </div>
                                <button type="submit" className="w-full btn-primary ">Đăng nhập</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn chưa có tài khoản ? <Link to='/register' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login