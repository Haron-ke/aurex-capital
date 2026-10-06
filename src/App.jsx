 import { useEffect, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  ShieldCheck
} from "lucide-react";
import { supabase } from "./lib/supabase";

function App() {
  const [mode, setMode] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        loadDemoAccount(session.user.id);
      } else {
        setAccount(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (session?.user) {
      setUser(session.user);
      await loadDemoAccount(session.user.id);
    }
  }

  async function loadDemoAccount(userId) {
    const { data, error } = await supabase
      .from("demo_accounts")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!error) {
      setAccount(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "signup") {
      const {
        data,
        error: signupError
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (signupError) {
        setError(signupError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        setUser(data.user);
        await loadDemoAccount(data.user.id);
      } else {
        setMessage(
          "Account created. Check your email to confirm your account."
        );
      }
    } else {
      const {
        data,
        error: loginError
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      setUser(data.user);
      await loadDemoAccount(data.user.id);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);
    setAccount(null);
    setEmail("");
    setPassword("");
  }

  if (user) {
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

          <button className="login-btn" onClick={logout}>
            Logout
          </button>
        </header>

        <main className="dashboard-preview">
          <div className="dashboard-welcome">
            <span className="section-label">DEMO ACCOUNT</span>

            <h2>
              Welcome to <span>AUREX CAPITAL</span>
            </h2>

            <p>
              Your demo trading account is ready.
            </p>
          </div>

          <div className="account-card dashboard-card">
            <div className="card-top">
              <span>DEMO ACCOUNT</span>

              <span className="live-badge">
                <i />
                ACTIVE
              </span>
            </div>

            <div className="balance-label">
              Available Balance
            </div>

            <div className="balance">
              $
              {Number(account?.balance ?? 10000).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }
              )}
            </div>

            <div className="balance-change">
              DEMO FUNDS
            </div>

            <div className="account-stats">
              <div>
                <span>Equity</span>
                <strong>
                  $
                  {Number(account?.equity ?? 10000).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }
                  )}
                </strong>
              </div>

              <div>
                <span>Account</span>
                <strong>
                  {account?.account_number ?? "Loading..."}
                </strong>
              </div>
            </div>
          </div>

          <div className="dashboard-next">
            <div>
              <ShieldCheck size={20} />
              <strong>Your demo environment is ready</strong>
              <p>
                The next stage will add markets, charts and trading
                controls.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app auth-app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <h1>AUREX</h1>
            <span>CAPITAL</span>
          </div>
        </div>
      </header>

      <main className="auth-layout">
        <section className="auth-intro">
          <div className="eyebrow">
            <span className="status-dot" />
            DEMO TRADING PLATFORM
          </div>

          <h2>
            Precision in every
            <span> market move.</span>
          </h2>

          <p>
            A clean, professional environment for exploring the
            forex market with virtual funds.
          </p>

          <div className="auth-points">
            <div>
              <ShieldCheck size={18} />
              <span>Secure account experience</span>
            </div>

            <div>
              <LockKeyhole size={18} />
              <span>$10,000 demo starting balance</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-heading">
            <span className="section-label">
              {mode === "signup"
                ? "GET STARTED"
                : "WELCOME BACK"}
            </span>

            <h3>
              {mode === "signup"
                ? "Create your account"
                : "Sign in to AUREX"}
            </h3>

            <p>
              {mode === "signup"
                ? "Create your demo trading account."
                : "Continue to your demo account."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <label className="input-group">
                <span>Full name</span>

                <div className="input-wrap">
                  <User size={17} />

                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </label>
            )}

            <label className="input-group">
              <span>Email address</span>

              <div className="input-wrap">
                <Mail size={17} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="input-group">
              <span>Password</span>

              <div className="input-wrap">
                <LockKeyhole size={17} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </label>

            {error && (
              <div className="form-message error">
                {error}
              </div>
            )}

            {message && (
              <div className="form-message success">
                {message}
              </div>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                ? "Create Demo Account"
                : "Sign In"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              onClick={() => {
                setMode(
                  mode === "signup" ? "login" : "signup"
                );
                setError("");
                setMessage("");
              }}
            >
              {mode === "signup" ? "Sign in" : "Create account"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
