const InputValidationMessages = ({ key }) => {
  return (
    <>
      <p>messages</p>
      <section>
        {
          {
            "0-0": <p> 0 - 0</p>,
            "1-1": <p>1 - 1</p>,
          }[key]
        }
      </section>
    </>
  );
};
export default InputValidationMessages;
