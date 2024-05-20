
const Switch = ({ setToday, setWeek, today, week }) => {
    return (
        <span className=" border border-black flex gap-2 rounded-full  relative   ">
            <span
                onClick={() => {
                    setToday(true);
                    setWeek(false);
                }}
                className={`px-2 cursor-pointer
        flex justify-center items-center
         ${today
                        ? "bg-blue-950  animate-switch_today text-white font-bold"
                        : "bg-blue-950/70 text-gray-600 font-bold text"
                    } rounded-full`}
            >
                <p className={`px-2 text-xs md:text-sm  text-center ${today && "gradient-text"} `}>Today</p>
            </span>

            <span
                onClick={() => {
                    setToday(false);
                    setWeek(true);
                }}
                className={`flex justify-center items-center px-2 cursor-pointer ${week
                    ? "bg-blue-950 animate-switch_week  text-white font-bold"
                    : "bg-blue-950/70  text-gray-600  font-bold "
                    } rounded-full`}
            >
                <p className={`px-2  text-center text-xs  md:text-sm ${week && "gradient-text"} `}>
                    This Week
                </p>
            </span>
        </span>)
}
export default Switch;