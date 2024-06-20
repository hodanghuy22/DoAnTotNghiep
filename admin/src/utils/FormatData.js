import { format } from 'date-fns-tz';
const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat('vi-VN');
    return formatter.format(number);
};
const formatDate = (dateString) => {
    if (!dateString) return "Chưa giao";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
const formatDateTime = (dateString) => {
    if (!dateString) return "Chưa giao";
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${hours}:${minutes} - ${dayOfWeek} (${day}/${month}/${year})`;
};
const removeVietnameseTones = (str) => {
    if (!str) return ''; // Handle undefined or null case

    str = str.toLowerCase();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
    str = str.replace(/đ/g, 'd'); // Replace đ with d
    str = str.replace(/\s+/g, '-'); // Replace spaces with -
    str = str.replace(/[^\w-]+/g, ''); // Remove special characters
    return str;
};
const formatDateVN = () => {
    const currentDate = new Date();

    return format(currentDate, 'yyyy-MM-dd\'T\'HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });

}
const FormatData = {
    formatNumber,
    formatDate,
    formatDateTime,
    removeVietnameseTones,
    formatDateVN


};
export default FormatData
