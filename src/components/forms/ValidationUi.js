import { SPECIAL_CHARS_ALLOWED_IN_PASSWORD } from "../../general/constants";

const ValidationUi = () => {
  //

  return (
    <>
      <section>
        <p>Popraw adres poczty elektronicznej</p>
        <div>sekcja walidacji hasła</div>
        <p>długość hasła - od 5 do 15 znaków</p>
        <p>
          obecność minimum jednego znaku specjalnego:{" "}
          {SPECIAL_CHARS_ALLOWED_IN_PASSWORD}
        </p>
        <p>obecność minimum jednej cyfry</p>
        <p>zgodność obu haseł</p>
      </section>
    </>
  );
};

export default ValidationUi;
