import { useState } from "react";

import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <h1>Rejestracja</h1>

      <div>
        {/* v-if="!userId"  */}
        <form>
          <div>
            <label for="name">Imię</label>
            <input type="text" name="name" id="name" />
          </div>

          <div>
            <label for="email">Adres e-mail</label>
            <input type="email" name="email" id="email" />
          </div>

          <div>
            <label for="password">Hasło</label>
            <input type="password" name="password" id="password" />
          </div>

          <div>
            <label for="password_confirmation">Potwierdź hasło</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
            />
          </div>

          <button> Stwórz konto</button>
        </form>
        {/* v-else-if="userId=='exists'" */}
        <div>
          <p>Użytkownik o podanym adresie e-mail, istnieje już w systemie</p>
          <p>Popraw adres poczty elektronicznej</p>
          <p>Skorzystaj z opcji odzyskiwania hasła</p>
        </div>
        {/* v-else */}
        <div>
          <p>
            Na podany podczas rejestracji adres e-mail, wysłaliśmy wiadomość z
            linkiem do aktywacji konta
          </p>
        </div>
      </div>

      <div>
        <button>
          <Link to="/">Powrót do strony początkowej</Link>
        </button>
      </div>
    </>
  );
};

export default SignUp;
