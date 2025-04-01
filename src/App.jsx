import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Layout from "@/routes/layout";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Employee from "@/pages/Employee/Employee.jsx";
import Department from "@/pages/Department/department";
import Project from "@/pages/Project/project";
import Account from "@/pages/Account/Account";
import Role from "@/pages/Role/Role";
import Task from "@/pages/Task/Task";
import TaskDepartment from "@/pages/TaskDepartment/TaskDepartment";

import RequireAuth from "@/components/RequireAuth";

import { theme as antdTheme } from "antd";
import { useTheme } from "@/hooks/use-theme";
import { AuthProvider } from "@/contexts/authContext";

import Login from "./pages/Authenticate/Login";

// import Register from "./pages/Register";
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
                    element: <Dashboard />,
                },
                {
                    path: "employees",
                    element: <RequireAuth><Employee /></RequireAuth>,
                },
                {
                    path: "department",
                    element: <RequireAuth><Department /></RequireAuth>,
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
    
    ]);

    return (
        <AuthProvider>
            <ThemeProvider storageKey="theme">
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
