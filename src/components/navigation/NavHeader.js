import useAuthentication from "../../hooks/useAuthentication";
import CustomButton from "../buttons/CustomButton";

const NavHeader = () => {
  const { userName, token, userLogOut } = useAuthentication();

  return (
    <>
      {token && (
        <header>
          <section>
            <div>Logo</div>
            <div>Repeater APP</div>
          </section>
          <section>
            <div>{userName}</div>
            <div>
              <CustomButton text="Logout" onClickAction={userLogOut} />
            </div>
          </section>
        </header>
      )}
    </>
  );
};

export default NavHeader;
