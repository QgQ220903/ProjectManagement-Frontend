
import React, { useState } from 'react';
import { Typography, Flex, Tag, Input, Avatar, Card, Button  } from 'antd';
import { SquareX, SendHorizontal } from 'lucide-react';
import { cn } from "@/utils/cn";

const { Title } = Typography;

const { TextArea } = Input;

export const Chat = ({ data }) => {
    return (
        <>
            <Flex vertical  className='h-full p-2'>
                {/* Khu vực tin nhắn */}
                <Flex vertical 
                className='p-2 overflow-y-auto flex-1'
                >

                 
                    <ChatItem />
                    <ChatItem />

                    <ChatItem isSender={true} />

                </Flex>

                {/* Khu vực nhập tin nhắn */}
                <div  className='p-2 pt-4 border-t border-x-gray-400 border-solid'>
                   <Flex gap={'small'} className='px-4'> 
                    <Input placeholder="Nhập tin nhắn..." size="large"/> 
                   <Button size='large'>
                    <SendHorizontal/>
                   </Button>
                   </Flex>
                </div>
            </Flex>
        </>
    )
}



export const ChatItem = ({ isSender }) => {

    return (
        <>
            <Flex gap="small" className={cn("mb-3", isSender && "flex-row-reverse")}>
                <Avatar className='shrink-0'>
                    TQT
                </Avatar>

                <Card className='border border-1 p-0 rounded-lg'>
                    <span>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo dicta iste facere est, ullam eveniet perspiciatis iure quaerat provident similique nobis voluptatem possimus? Neque sint libero velit, voluptatum dolore dolores?
                    </span>
                </Card>
            </Flex>
        </>
    )
}

export const HeaderChat = ({ data, onClose }) => {
    return (
        <>
            <div className='mb-2'>
                <a onClick={onClose}><SquareX /></a>
            </div>
            {data &&
                (
                    <>
                        <div className='ml-5'>
                            <div>
                                <Title level={4}>{data.name}</Title>
                              
                                <Flex justify={"space-between"} >
                                <p className='ml-3 font-light'>Người chịu trách nhiệm :
                                    {data.responsible.map((item, index) => (
                                        <Tag key={item.id} color="green" className='ml-2'>
                                            <p className='font-medium'>{item.employeeName}</p>
                                        </Tag>))
                                    }

                                </p>
                                    <div>
                                        <Tag color='red'>End Task: {data.end_time}</Tag>
                                    </div>
                                </Flex>
                            </div>

                        </div>

                        <div className='ml-5 mt-5'>
                            <Title level={5}>Mô tả:</Title>
                            <TextArea rows={3} value={data.description} readOnly/>
                        </div>

                        <div className='ml-5 mt-5'>
                            <Title level={5}>Thành viên:</Title>
                            {data.listWork.map((item, index) => (
                                <Tag key={item.id} color="red" className=''>
                                    <p className='font-medium'>{item.employeeName}</p>
                                </Tag>))
                            }
                        </div>

                    </>
                )
            }


        </>
    )
}