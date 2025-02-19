import React from 'react'
import ButtonIcon from './ButtonIcon'
import { Breadcrumb, Typography } from 'antd';

import { Plus } from 'lucide-react';


const { Title } = Typography;

const PageHeader = ({ title, handleNewDepartment, titleButton, itemsBreadcrumb }) => {
    return (
        <>
            <div className='flex justify-between items-center '>
                <Title level={2} className='title'>{title}</Title>

                <ButtonIcon handleNewDepartment={handleNewDepartment}><Plus />{titleButton}</ButtonIcon>
            </div>

            <div className='mb-7'>
                <Breadcrumb items={itemsBreadcrumb}></Breadcrumb>
            </div>
           

        </>
    )
}

export default PageHeader