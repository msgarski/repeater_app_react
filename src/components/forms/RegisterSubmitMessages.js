const RegisterSubmitMessages = ({ nameIsValid, emailIsValid, passIsValid }) => {
  return (
    <>
      <div>
        <p>Poprawnie uzupełnij pole: </p>
      </div>
      {!nameIsValid ? <p>Name </p> : null}
      {!emailIsValid ? <p>Email </p> : null}
      {!passIsValid ? <p>Password </p> : null}
    </>
  );
};

export default RegisterSubmitMessages;
