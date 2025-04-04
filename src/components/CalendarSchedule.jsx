import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // cho kéo/thả, click



export const CalendarSchedule = ({events, dateClick, eventClick}) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            // events={[
            //     { title: 'Họp nhóm', start: '2025-04-06T10:00:00', end: '2025-04-10T11:00:00' },
            //     { title: 'Làm bài tập', date: '2025-04-07' }
            // ]}
            events={events}
            dateClick={(info) => {
                alert('Bạn đã click vào ngày: ' + info.dateStr);
                dateClick(info)
                // có thể mở form tạo sự kiện ở đây
            }}
            eventClick={(info) => {
                alert('Sự kiện: ' + info.event.title);
                eventClick(info)
                // có thể mở form sửa/xoá sự kiện ở đây
            }}
        />

    )
}

export default CalendarSchedule