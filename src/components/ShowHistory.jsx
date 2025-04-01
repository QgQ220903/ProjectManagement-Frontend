
import React from 'react'
import { Button, Modal, Timeline } from 'antd';

const ShowHistory = ({ isModalOpen, setIsModalOpen }) => {

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const items = [
        {
            children: 'Create a services site 2015-09-01',
        },
        {
            children: 'Solve initial network problems 2015-09-01',
        },
        {
            children: 'Technical testing 2015-09-01',
        },
        {
            children: 'Network problems being solved 2015-09-01',
        },
        {
            children: 'Create a services site 2015-09-01',
        },
        {
            children: 'Solve initial network problems 2015-09-01',
        },
        {
            children: 'Technical testing 2015-09-01',
        },
        {
            children: 'Network problems being solved 2015-09-01',
        },
    ]
    return (
        <Modal title="Lịch sử" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
          <div    className='mt-4 p-4 overflow-y-auto' style={{
            height: '300px'
        }}>
                <Timeline
             
                    items={items}
                />
          </div>
        </Modal>
    )
}

export default ShowHistory