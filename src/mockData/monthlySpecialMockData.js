import MonthlySpecialImage from '../assets/images/2026-FebSpecials.png'
export const monthlySpecialMockData = {
    id: 1,
    month: 'february',
    image: {
        url: MonthlySpecialImage ,
        alt: "February 2026 Monthly Specials",
        sizes: "(max-width: 1024px) 100vw, 1024px"
    },
    validUntil: "2026-02-28",
    featured: true
};

// Mock API function to simulate fetching data
export const fetchMonthlySpecial = async () => {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(monthlySpecialMockData);
        }, 1000);
    });
};