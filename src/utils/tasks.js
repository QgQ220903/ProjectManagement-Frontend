// Hàm tìm kiếm theo key theo valuee
export const searchSubtasks = (subtasks, value, key) => {
    return subtasks.some((subtask) => {
        // Kiểm tra trường key có trong subtask và có chứa giá trị tìm kiếm
        if (subtask[key] && subtask[key].toLowerCase().includes(value.toLowerCase())) {
            return true;
        }

        // Nếu có các subtasks con, tiếp tục tìm kiếm đệ quy
        if (subtask.subtasks && Array.isArray(subtask.subtasks)) {
            return searchSubtasks(subtask.subtasks, value, key); // Đệ quy vào subtasks con
        }

        return false;
    });
};

// Hàm tìm kiếm respone theo valuee
export const searchSubtasksResponsible_person = (subtasks, value) => {
    return subtasks.some((subtask) => {
        // Kiểm tra trường key có trong subtask và có chứa giá trị tìm kiếm
        if (subtask.responsible_person && subtask.responsible_person.name.toLowerCase().includes(value.toLowerCase())) {
            return true;
        }

        // Nếu có các subtasks con, tiếp tục tìm kiếm đệ quy
        if (subtask.subtasks && Array.isArray(subtask.subtasks)) {
            return searchSubtasksResponsible_person(subtask.subtasks, value); // Đệ quy vào subtasks con
        }

        return false;
    });
};


export const groupByDepartment = (data) => {
    const grouped = data.reduce((acc, item) => {
      const id = item.department_id;
      
      if (!acc[id]) {
        acc[id] = {
          department_id: item.department_id,
          department_name: item.department_name,
          total_tasks: 0,
          done: 0,
          delayed: 0,
          in_process: 0
        };
      }
  
      acc[id].total_tasks += item.total_tasks;
      acc[id].done += item.done;
      acc[id].delayed += item.delayed;
      acc[id].in_process += item.in_process;
  
      return acc;
    }, {});
  
    return Object.values(grouped);
  }