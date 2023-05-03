import {FC} from "react";
import {useAppContext} from "../../context/AppContext";

export const ProfilePage: FC = () => {
  const {currentEmployee} = useAppContext();

  return (
    <>
      {currentEmployee && (
        Object.entries(currentEmployee).map(([key, value]) => (
          <p>
            <strong>{key}</strong>: {value}
          </p>
        ))
      )}
    </>
  )
}
