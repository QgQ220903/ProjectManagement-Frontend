import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
    if (!dateString) return ""; // Kiểm tra nếu không có giá trị

    const date = new Date(dateString);
    if (isNaN(date)) return "Ngày không hợp lệ"; // Kiểm tra nếu ngày không hợp lệ

    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày (DD)
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (MM)
    const year = date.getFullYear(); // Lấy năm (YYYY)

    return `${day}-${month}-${year}`;
};

export const removeLocalStorageWhenLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");      
    localStorage.removeItem("auth");      
}

// export const getRandomColor = () => {
//     return "#" + Math.floor(Math.random() * 16777215).toString(16);
// };

export const getRandomColor = () => {
    const colors = [
      '#3498db', // xanh dương
      '#1abc9c', // xanh ngọc
      '#2ecc71', // xanh lá
      '#e74c3c', // đỏ
      '#f1c40f', // vàng
      '#e91e63', // hồng
      '#f39c12', // cam
      '#9b59b6', // tím
      '#34495e', // xám xanh đậm
      '#16a085', // xanh ngọc đậm
      '#d35400', // cam đậm
      '#c0392b', // đỏ đậm
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  
  
  
export const getInitials = (fullName) => {
    if (!fullName) return "";
  
    return fullName
      .trim()
      .split(/\s+/) // tách theo khoảng trắng
      .map(word => word[0].toUpperCase())
      .join("");
  }
  

//   check mảng rổng
export const isArrayEmpty = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
  }

  export const splitEmployeeNames = (employeeString) => {
    if (!employeeString || typeof employeeString !== 'string') return [];

    var x = employeeString
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);

        if(x.length > 4)
        {
            x= x.slice(0,3)
            x.push('v.v...')
        }
        return x;
};