import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationItem from "../components/ConversationItem";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { logout } from "../features/auth/authSlice";
import { fetchRecommendations } from "../features/guide/guideSlice";

const HomeScreen = () => {
  const [craving, setCraving] = useState("");
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { items, loading, error, message } = useSelector((state) => state.guide);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(fetchRecommendations({ craving, query }));
  };

  return (
    <main className="home-layout">
      <header className="card hero">
        <h1>Kapampangan Food Finder</h1>
        <p>Get recommendations for Kapampangan dishes and Pampanga eateries only.</p>
        <div className="hero-row">
          <span>Welcome, {userInfo?.user?.name || "Food Explorer"}</span>
          <button type="button" className="btn-secondary" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
      </header>

      <section className="card">
        <form className="stack" onSubmit={submitHandler}>
          <label htmlFor="craving">Craving</label>
          <input
            id="craving"
            type="text"
            placeholder="savory, sweet, soup"
            value={craving}
            onChange={(event) => setCraving(event.target.value)}
          />

          <label htmlFor="query">Ask a food request</label>
          <input
            id="query"
            type="text"
            placeholder="e.g. Where can I eat sisig in San Fernando, Pampanga?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button type="submit" className="btn-primary">
            Get Recommendations
          </button>
        </form>
      </section>

      {loading && <Loader />}
      {error && <Message variant="error">{error}</Message>}
      {message && <Message variant="info">{message}</Message>}

      <section className="results-grid">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          items.map((item) => <ConversationItem key={item.id} item={item} />)
        )}
      </section>
    </main>
  );
};

export default HomeScreen;
