import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Layout from "@/routes/layout";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Employee from "@/pages/Employee/Employee";
import Department from "@/pages/Department/Department";
import Project from "@/pages/Project/Project";
import Account from "@/pages/Account/Account";
import Role from "@/pages/Role/Role";
import Task from "@/pages/Task/Task";
import TaskDepartment from "@/pages/TaskDepartment/TaskDepartment";
// import Chart from "@/pages/Chart/Chart";

import Home from "@/pages/Home/Home";

import TaskArchive from "@/pages/TaskArchive/TaskArchive";

import RequireAuth from "@/components/RequireAuth";

import { theme as antdTheme } from "antd";
import { useTheme } from "@/hooks/use-theme";
import { AuthProvider } from "@/contexts/authContext";

import Login from "@/pages/Authenticate/Login";

import ProjectPart from "@/pages/Project/ProjectPart";

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
            element: <RequireAuth>
                <MainLayout />
            </RequireAuth>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                    
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                    
                },
                {
                    path: "employees",
                    element: <Employee />
                },
                {
                    path: "department",
                    element: <Department />
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
                    path: "task-archive",
                    element: <TaskArchive />,
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
