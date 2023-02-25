import { useEffect, useRef, useState } from "react";

const EmailDoubleMessages = ({ emailValidationState, fieldId }) => {
  const firstTimeRef = useRef(true);
  const [visited, setVisisted] = useState(false);
  const nonOmitted = emailValidationState["nonOmitted".concat(fieldId)];
  const correctness = emailValidationState["properStructure"];
  const identity = emailValidationState["identity"];

  const keyFirst = `${nonOmitted}-${correctness}`;
  const keySecond = `${nonOmitted}-${identity}`;

  useEffect(() => {
    console.log("firstTimeRef", firstTimeRef.current);
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
    } else {
      setVisisted(true);
    }
  }, [nonOmitted, setVisisted]);

  return (
    <>
      {visited ? (
        {
          First: {
            "false-false": <p>Pole nie może być puste</p>,
            "true-false": <p>Nie wygląda to na razie na adres email...</p>,
            "true-true": <p>Teraz jest OK</p>,
          }[keyFirst],
          Second: {
            "false-false": <p>Pole nie może być puste</p>,
            "true-false": <p>Oba pola muszą być takie same...</p>,
            "true-true": <p>No, teraz jest SUPER !</p>,
          }[keySecond],
        }[fieldId]
      ) : (
        <p></p>
      )}
    </>
  );
};

export default EmailDoubleMessages;
