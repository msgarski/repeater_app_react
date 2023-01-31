import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <>
      <div>Resetowanie starego hasła</div>
      <form>
        <p>Wprowadź nowe hasło:</p>

        <div>
          <label for="password">Podaj hasło</label>
          <input type="password" name="password" v-model="password" />
        </div>

        <div>
          <label for="password_confirmation">Powtórz hasło</label>
          <input
            type="password"
            name="password_confirmation"
            v-model="password_confirmation"
          />
        </div>

        <button>Wyślij</button>
      </form>
    </>
  );
};

export default ResetPassword;
