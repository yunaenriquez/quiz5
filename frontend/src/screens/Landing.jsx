import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="landing-wrap">
      <section className="card landing-card">
        <p className="landing-tag">Pampanga-Only Food Guide</p>
        <h1>Find Authentic Kapampangan Food Spots</h1>
        <p>
          Get dish and eatery recommendations focused on Pampanga based on your cravings. The guide is intentionally
          limited to food-related requests inside the local area.
        </p>
        <div className="landing-actions">
          <Link to="/login" className="btn-primary landing-link">
            Login
          </Link>
          <Link to="/register" className="btn-secondary landing-link">
            Register
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Landing;
