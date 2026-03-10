const Message = ({ variant = "info", children }) => {
  return <div className={`message ${variant}`}>{children}</div>;
};

export default Message;
