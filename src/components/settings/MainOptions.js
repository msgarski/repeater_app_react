import useAuthentication from "../../hooks/useAuthentication";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const MainOptions = () => {
  const { token, userId } = useAuthentication();

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>Main Options</div>
    </>
  );
};

export default MainOptions;
