
import React, { Children } from 'react'
import { Button, Modal, Timeline } from 'antd';
import {formatDate} from '@/utils/cn'

const ShowHistory = ({ isModalOpen, setIsModalOpen, items, handleCancel }) => {

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
   

    // const items = [
    //     {
    //         children: 'Create a services site 2015-09-01',
    //     },
    //     {
    //         children: 'Solve initial network problems 2015-09-01',
    //     },
    //     {
    //         children: 'Technical testing 2015-09-01',
    //     },
    //     {
    //         children: 'Network problems being solved 2015-09-01',
    //     },
    //     {
    //         children: 'Create a services site 2015-09-01',
    //     },
    //     {
    //         children: 'Solve initial network problems 2015-09-01',
    //     },
    //     {
    //         children: 'Technical testing 2015-09-01',
    //     },
    //     {
    //         children: 'Network problems being solved 2015-09-01',
    //     },
    // ]
    return (
        
        <Modal title="Lịch sử" open={isModalOpen}  onCancel={handleCancel}  maskClosable={false} onClose={handleCancel} footer={false} >
          <div    className='mt-4 p-4 overflow-y-auto  font-normal flex justify-start ' style={{
            height: '200px'
        }}>
            {console.log(items)}
                <Timeline className=''
                
                mode='alternate'
                    items={items.map((item, index) => ({
                        ...item,
                        label:  formatDate(item.created_at),
                        children: `${item.content} `,
                    }))}
                />
          </div>
        </Modal>
    )
}

export default ShowHistory