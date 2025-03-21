import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Layout from "@/routes/layout";
import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/Home";
import Employee from "@/pages/Employee/Employee.jsx";
import Department from "@/pages/Department/department";
import Project from "@/pages/Project/project";
import Account from "@/pages/Account/Account";
import Role from "@/pages/Role/Role";
import Task from "@/pages/Task/Task";
import TaskDepartment from "@/pages/TaskDepartment/TaskDepartment";

import { theme as antdTheme } from "antd";
import { useTheme } from "@/hooks/use-theme";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import ProjectPart from "./pages/Project/ProjectPart";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});
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
                    element: <Employee />,
                },
                {
                    path: "department",
                    element: <Department />,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "project",
                    element: <Project />,
                },
                {
                    path: "project/:id",
                    element: <ProjectPart />,
                },

                {
                    path: "account",
                    element: <Account />,
                },
                {
                    path: "role",
                    element: <Role />,
                },
                {
                    path: "task",
                    element: <Task />,
                },
                {
                    path: "task-department",
                    element: <TaskDepartment/>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
                {
                    path: "test",
                    element: <Test />,
                },
            ],
        },
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "register",
            element: <Register />,
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
