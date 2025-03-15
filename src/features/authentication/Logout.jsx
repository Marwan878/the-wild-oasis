import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

export default function Logout() {
  const { logout, isLogingOut } = useLogout();

  return (
    <ButtonIcon
      style={{ display: "flex", alignItems: "center", columnGap: "1rem" }}
      disabled={isLogingOut}
      onClick={logout}
    >
      {isLogingOut ? (
        <SpinnerMini />
      ) : (
        <>
          Logout <HiArrowRightOnRectangle />
        </>
      )}
    </ButtonIcon>
  );
}
