function Button({ isDisable, onClick, children }) {
  return (
    <button disabled={isDisable} onClick={() => onClick()}>
      {children}
    </button>
  );
}

export default Button;
