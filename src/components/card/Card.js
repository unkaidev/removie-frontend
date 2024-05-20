import { NO_IMAGE, addPoster } from "../../utils/constants/const";

const Card = ({ profile, name, character, known_for_department }) => {
  return (
    <div className="flex flex-col  justify-between w-full h-full">
      <div className="h-1/2">
        <img
          className="object-cover w-full h-full  rounded-xl  text-white"
          src={!profile ? NO_IMAGE : profile}
          alt={name ?? "No name"}
        />
      </div>
      <div
        className="  text-center font-bold text-white
flex flex-col  justify-around gap-5  h-1/2  overflow-ellipsis line-clamp-2"
      >
        <p className="  text-md">{name ?? "Unknown"}</p>
        <div className="text-sm">
          Character: {character ?? "Unknown"} ({known_for_department ?? "Unknown"})
        </div>


      </div>
    </div>
  );
};
export default Card