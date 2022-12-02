export const Button = ({ text, leadingIcon, trailingIcon, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {leadingIcon}
      {text}
      {trailingIcon}
    </button>
  );
};
