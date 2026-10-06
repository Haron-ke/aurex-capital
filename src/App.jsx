import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  ShieldCheck,
  Wallet,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

const markets = [
  { pair: "EUR/USD", price: "1.17420", change: "+0.12", up: true },
  { pair: "GBP/USD", price: "1.34680", change: "+0.08", up: true },
  { pair: "USD/JPY", price: "149.420", change: "-0.15", up: false },
  { pair: "AUD/USD", price: "0.66120", change: "+0.21", up: true }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <h1>AUREX</h1>
            <span>CAPITAL</span>
          </div>
        </div>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#markets">Markets</a>
          <a href="#platform">Platform</a>
          <a href="#security">Security</a>
          <button className="login-btn">Login</button>
          <button className="signup-btn">Create Account</button>
        </nav>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              DEMO TRADING PLATFORM
            </div>

            <h2>
              Precision in every
              <span> market move.</span>
            </h2>

            <p>
              Experience a clean, professional forex trading environment
              designed for smarter market practice.
            </p>

            <div className="hero-actions">
              <button className="primary-action">
                Start Demo
                <ChevronRight size={18} />
              </button>

              <button className="secondary-action">
                Explore Markets
              </button>
            </div>
          </div>

          <div className="account-card">
            <div className="card-top">
              <span>DEMO ACCOUNT</span>
              <span className="live-badge">
                <i />
                ACTIVE
              </span>
            </div>

            <div className="balance-label">Available Balance</div>

            <div className="balance">$10,000.00</div>

            <div className="balance-change">
              <ArrowUpRight size={16} />
              $0.00 <span>Today</span>
            </div>

            <div className="account-stats">
              <div>
                <span>Equity</span>
                <strong>$10,000.00</strong>
              </div>

              <div>
                <span>Free Margin</span>
                <strong>$10,000.00</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="markets">
          <div className="section-heading">
            <div>
              <span className="section-label">MARKET WATCH</span>
              <h3>Popular currency pairs</h3>
            </div>

            <button className="view-all">
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className="market-grid">
            {markets.map((market) => (
              <div className="market-card" key={market.pair}>
                <div className="market-header">
                  <span className="pair">{market.pair}</span>

                  {market.up ? (
                    <ArrowUpRight className="positive" size={18} />
                  ) : (
                    <ArrowDownRight className="negative" size={18} />
                  )}
                </div>

                <div className="market-price">{market.price}</div>

                <div
                  className={
                    market.up
                      ? "market-change positive"
                      : "market-change negative"
                  }
                >
                  {market.change}%
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="feature-section" id="platform">
          <div className="feature-intro">
            <span className="section-label">THE AUREX EXPERIENCE</span>
            <h3>Built around clarity.</h3>
            <p>
              A focused trading interface that keeps the information you
              need close and the distractions away.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <BarChart3 size={22} />
              <h4>Market Intelligence</h4>
              <p>
                Follow currency pairs through a clean market-focused
                interface.
              </p>
            </div>

            <div className="feature-card">
              <Wallet size={22} />
              <h4>Demo Portfolio</h4>
              <p>
                Track your virtual balance, equity and trading performance
                in one place.
              </p>
            </div>

            <div className="feature-card" id="security">
              <ShieldCheck size={22} />
              <h4>Secure Experience</h4>
              <p>
                Your account experience is designed with security and
                privacy in mind.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>AUREX CAPITAL</strong>
          <span>Precision. Opportunity. Growth.</span>
        </div>

        <p>© 2026 AUREX CAPITAL. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
