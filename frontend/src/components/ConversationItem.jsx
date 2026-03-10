const ConversationItem = ({ item }) => {
  return (
    <article className="conversation-item">
      <h3>{item.dish}</h3>
      <p>
        <strong>Craving:</strong> {item.craving}
      </p>
      <p>
        <strong>Place:</strong> {item.place}, {item.city}, {item.province}
      </p>
      <p>{item.notes}</p>
    </article>
  );
};

export default ConversationItem;
