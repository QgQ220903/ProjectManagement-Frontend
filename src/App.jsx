import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

// import Layout from "@/routes/layout";
import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/Home";
import Employee from "@/pages/Employee.jsx";
import Department from "@/pages/Department/department";


import { theme as antdTheme } from 'antd';
import { useTheme } from "@/hooks/use-theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analytics</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "employees",
                    element: <Employee/>,
                },
                {
                    path: "department",
                    element: <Department/>,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "products",
                    element: <h1 className="title">Products</h1>,
                },
                {
                    path: "new-product",
                    element: <h1 className="title">New Product</h1>,
                },
                {
                    path: "inventory",
                    element: <h1 className="title">Inventory</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
                {
                    path: "test",
                    element: <Test/>,
                },
              
            ],
        },
        {
            path: "login",
            element: <Login/>,
        },
        {
            path: "register",
            element: <Register/>,
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
