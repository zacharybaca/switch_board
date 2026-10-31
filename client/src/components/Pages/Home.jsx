import './home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <h1>
            Switch<span className="hero-accent">Board</span>
          </h1>
          <p>Assign with confidence. Protect your team's capacity.</p>
        </div>
      </section>

      <div className="page-content">
        <section className="all-companies-section">
          <h2>
            Includes React frontend, Express API, MongoDB connection, and custom fetcher.
          </h2>
        </section>
      </div>
    </div>
  );
};

export default Home;
