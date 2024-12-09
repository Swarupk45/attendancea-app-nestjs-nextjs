// "use client";
// import { useState } from "react";

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // Helper function to get the days in the current month
//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   // Helper function to get the first day of the month
//   const getFirstDayOfMonth = (month, year) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const daysInMonth = getDaysInMonth(
//     currentDate.getMonth(),
//     currentDate.getFullYear()
//   );

//   const firstDayOfMonth = getFirstDayOfMonth(
//     currentDate.getMonth(),
//     currentDate.getFullYear()
//   );

//   // Handle month navigation
//   const handlePrevMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };

//   return (
//     <div className="mx-auto max-w-7xl mt-20">
//       {/* Header with navigation */}
//       <div className="flex items-center justify-between mb-4 text-black bg-blue-500 h-20 ">
//         <button
//           className="px-4 py-2 bg-primary  rounded text-black"
//           onClick={handlePrevMonth}
//         >
//           Previous
//         </button>
//         <h2 className="text-lg font-semibold">
//           {currentDate.toLocaleString("default", { month: "long" })}{" "}
//           {currentDate.getFullYear()}
//         </h2>
//         <button
//           className="px-4 py-2 bg-primary  rounded"
//           onClick={handleNextMonth}
//         >
//           Next
//         </button>
//       </div>

//       {/* Calendar UI */}
//       <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <table className="w-full">
//           {/* Table header */}
//           <thead>
//             <tr className="grid grid-cols-7 bg-primary text-white">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                 <th
//                   key={day}
//                   className="flex items-center justify-center p-3 text-xs font-semibold sm:text-base"
//                 >
//                   {day}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           {/* Table body */}
//           <tbody>
//             {[...Array(6)].map((_, rowIndex) => (
//               <tr key={rowIndex} className="grid grid-cols-7">
//                 {[...Array(7)].map((_, colIndex) => {
//                   const day =
//                     rowIndex * 7 +
//                     colIndex -
//                     firstDayOfMonth +
//                     1; /* Calculate day number */
//                   return (
//                     <td
//                       key={colIndex}
//                       className={`relative h-20 border border-stroke p-2 ${
//                         day > 0 && day <= daysInMonth
//                           ? "cursor-pointer"
//                           : "opacity-50 bg-gray-100"
//                       }`}
//                     >
//                       {/* Render the day number if within the valid range */}
//                       {day > 0 && day <= daysInMonth && (
//                         <span className="font-medium text-black dark:text-white">
//                           {day}
//                         </span>
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Calendar;

"use client";
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper function to get the first day of the month
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  const firstDayOfMonth = getFirstDayOfMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-6 ">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePrevMonth}
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>

      {/* Calendar UI */}
      <div className="w-full rounded border border-gray-300 shadow-lg bg-white">
        <table className="w-full">
          {/* Table header */}
          <thead>
            <tr className="grid grid-cols-7 bg-blue-500 text-white">
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                (day) => (
                  <th
                    key={day}
                    className="flex items-center justify-center p-2 text-sm font-semibold"
                  >
                    {day}
                  </th>
                )
              )}
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {[...Array(6)].map((_, rowIndex) => (
              <tr key={rowIndex} className="grid grid-cols-7">
                {[...Array(7)].map((_, colIndex) => {
                  const day =
                    rowIndex * 7 + colIndex - firstDayOfMonth + 1; /* Calculate day number */
                  return (
                    <td
                      key={colIndex}
                      className={`relative h-20 border border-gray-300 p-2 ${
                        day > 0 && day <= daysInMonth
                          ? "cursor-pointer"
                          : "bg-gray-100 opacity-50"
                      }`}
                    >
                      {/* Render the day number if within the valid range */}
                      {day > 0 && day <= daysInMonth && (
                        <span className="font-medium text-gray-800">
                          {day}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
