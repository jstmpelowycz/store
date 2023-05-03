import {FC} from "react";
import {useAppContext} from "../../../context/AppContext";
import ReactJson from "react-json-view";

export const ProfilePage: FC = () => {
  const {currentEmployee} = useAppContext();

  return (
    <div className="d-flex flex-column m-5 w-50 p-3">
      {currentEmployee && (
        <ReactJson src={currentEmployee!}/>
      )}
    </div>
  )
}
