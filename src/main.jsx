import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  Check,
  ChevronDown,
  Layers3,
  Target,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useLessonAudio } from "../../shared/useLessonAudio";
import "./styles.css";
const files = import.meta.glob("./assets/illustrations/*.png", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  img = (n) => files[`./assets/illustrations/${n}.png`];
const tabs = [
  "Captain’s report",
  "Risk report",
  "What it communicates",
  "Built progressively",
  "Register vs. report",
  "Exam lens",
];
const details = {
  hook: {
    title: "A project’s risk communication works the same way.",
    text: "The risk register is the captain’s logbook — detailed, individual, entry by entry. This lesson is about the other document: the one built specifically to tell stakeholders how much risk the project is actually carrying, and where that exposure is heading.",
    image: "risk-communication-reveal",
  },
  meaning: {
    title: "The risk report answers a different question.",
    text: "This enabler asks the project manager to communicate the status of risk’s impact on the project — and the vehicle PMBOK® 8 provides for this is the risk report. Unlike the register, which was built once identification began and is maintained entry by entry, the risk report is built progressively across the entire risk management cycle — from Identify Risks all the way through Monitor Risks — accumulating and refining as the project learns more about its own risk exposure. Where the register manages risks one at a time, the report exists to answer a different question entirely: not “what is this specific risk,” but “how much risk is this project actually carrying right now, and is that picture getting better or worse?”",
    image: "risk-cycle-report-modal",
  },
  sources: {
    title: "Sources of Overall Project Risk",
    text: "Which categories or areas are actually driving the project’s exposure. This connects directly to the risk breakdown structure — the report tells stakeholders whether most of the project’s risk is technical, commercial, management, or external in origin, not just that risk exists somewhere.",
    image: "overall-risk-sources",
  },
  metrics: {
    title: "Summary Metrics Across Individual Risks",
    text: "Counts of threats versus opportunities, the distribution of risks across categories, and trend data showing whether the overall picture is improving or worsening over time. This is where the report becomes genuinely useful to a busy stakeholder: a single glance can show “twelve open threats, three open opportunities, top exposure category is commercial risk, trending down since last month” — without needing to read all fifteen individual register entries.",
    image: "summary-risk-metrics",
  },
  example: {
    title: "Worked example",
    text: "A steering committee reviewing a hospital construction project’s risk report might see that regulatory risk accounted for 60% of total exposure two months ago, and now accounts for only 25% following a successful early inspection — a trend line that tells the real story far faster than re-reading every individual risk entry that changed.",
    image: "hospital-risk-trend",
  },
  progressive: {
    title: "The report is built progressively.",
    text: "The risk report isn’t written once, near the end of planning, and then handed off as a finished artifact. It develops through every subsequent risk process — updated as new risks get identified, as qualitative and quantitative analysis refines the picture, as responses get implemented, and as monitoring reveals whether those responses are actually working. This matters because a risk report that’s only updated occasionally quickly becomes stale — reporting a risk picture that no longer reflects reality. A report built progressively, in step with the actual risk management cycle, stays trustworthy precisely because it’s kept current with the same rigor as the register underneath it.",
    image: "progressive-report-modal",
  },
  exam: {
    title:
      "Communicating risk status means giving each audience the document built for them.",
    text: "The risk register serves the risk owner managing individual risks day to day. The risk report — built progressively from Identify Risks through Monitor Risks — serves the stakeholder who needs the bigger picture: sources of overall exposure, the balance of threats and opportunities, and whether the trend is improving or getting worse. A well-maintained risk report turns a project’s entire risk landscape into something a sponsor can grasp in a few minutes, without ever needing to open the register underneath it.",
    image: "exam-captain-report",
    bullets: [
      "The risk report answers “how much risk overall, and is it improving?” — the register answers “what is this specific risk?”",
      "Report communicates two things: sources of overall risk (tied to the RBS) and summary metrics (threat/opportunity counts, category distribution, trend)",
      "Built progressively across the entire risk cycle (Identify → Monitor), never written once and frozen",
      "Register serves the risk owner; report serves the stakeholder/sponsor — each earns its place with a different audience",
    ],
  },
};
const cards = [
  {
    title: "The Register",
    tag: "INDIVIDUAL RISK DETAIL",
    text: "What a risk owner needs — the individual risk statement, its trigger, its response strategy, its current status. Built for someone managing that specific risk day to day.",
    image: "risk-register-card",
  },
  {
    title: "The Report",
    tag: "AGGREGATED RISK PICTURE",
    text: "What a stakeholder or sponsor needs — the aggregated picture, the trend, the overall exposure level. Built for someone who needs to understand the project’s risk posture without getting lost in fifteen or twenty individual entries.",
    image: "risk-report-card",
  },
];
const quiz = {
  q: "A project sponsor asks for a quick sense of how the project’s overall risk exposure has changed since last quarter — without wanting to read through all eighteen individual entries currently logged in the risk register. Which document should the project manager provide, and why?",
  a: [
    "The risk register, since it contains the most complete and detailed information available",
    "The risk report, since it’s specifically built to communicate overall exposure and trends without requiring a review of every individual risk",
    "Neither document, since risk exposure trends can only be communicated verbally in a meeting",
    "A newly created document, since neither the register nor the report is designed for this purpose",
  ],
  c: 1,
  g: "Correct! This is precisely the purpose the risk report serves — summarizing sources of overall risk and trend data at a glance, built progressively so it stays current, without forcing the reader through every register entry to get the picture they actually need.",
  b: "Reconsider — completeness is exactly the problem here, and this is exactly what the risk report already exists to do; there’s no need for a verbal-only answer or a brand-new document.",
};
function Modal({ d, close, read }) {
  const [step, setStep] = useState(0);
  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <section className="focus-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={close}>
          <X />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={img(d.image)} alt="" />
            <h3>{d.title}</h3>
            <div className="modal-copy">
              <p>{d.text}</p>
            </div>
          </>
        ) : (
          <div className="memory-step">
            <h3>Exam-Relevant Enablers to Remember</h3>
            <ul>
              {d.bullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        )}
        {d.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight />
          </button>
        ) : (
          <button
            className="modal-action"
            onClick={() => {
              read();
              close();
            }}
          >
            Mark as read <Check />
          </button>
        )}
      </section>
    </div>,
    document.body,
  );
}
function Quiz({ finish }) {
  const [p, setP] = useState(null);
  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{quiz.q}</h3>
        <div className="answers">
          {quiz.a.map((a, i) => (
            <button
              key={a}
              className={p === i ? (i === quiz.c ? "correct" : "wrong") : ""}
              onClick={() => setP(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {a}
            </button>
          ))}
        </div>
        {p !== null && (
          <>
            <p className={`feedback ${p === quiz.c ? "good" : "bad"}`}>
              {p === quiz.c ? quiz.g : quiz.b}
            </p>
            <button className="finish-check" onClick={finish}>
              Finish check <ArrowRight />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body,
  );
}
function App() {
  const [s, setS] = useState(0),
    [done, setDone] = useState(Array(6).fill(false)),
    [modal, setModal] = useState(null),
    [seen, setSeen] = useState([]),
    [flips, setFlips] = useState([]),
    [showQuiz, setShowQuiz] = useState(false),
    [sound, setSound] = useState(true);
  useLessonAudio(sound);
  const mark = (i = s) => setDone((d) => d.map((v, j) => (j === i ? true : v))),
    go = (i) => i >= 0 && i < 6 && (i <= s + 1 || done[i - 1]) && setS(i),
    open = (key, after) => setModal({ ...details[key], after });
  let c;
  if (s === 0)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">
            LESSON 6.4.3 · COMMUNICATE THE STATUS OF A RISK IMPACT ON THE
            PROJECT
          </p>
          <h1>
            Same voyage.
            <br />
            <span>Different purpose.</span>
          </h1>
          <p className="lead">
            Think about a ship’s captain reporting to headquarters. Nobody back
            at port wants a play-by-play of every wave the ship encountered.
            What they need is a clear picture: are we on course, how much fuel
            reserve is left, and are there storms ahead worth worrying about.
            That’s a different kind of report than the captain’s own detailed
            logbook — same voyage, entirely different purpose.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => !done[0] && open("hook")}
          >
            {done[0] ? "Reporting difference reviewed" : "Reveal the reporting difference"} <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={img("captain-logbook-hero")} alt="" />
      </div>
    );
  if (s === 1)
    c = (
      <div className="hero-layout">
        <div>
          <h2>What This Enabler Means</h2>
          <p className="lead">
            This enabler isn’t about writing a second risk register. It’s about
            answering a completely different question than the register was ever
            built to answer.
          </p>
          <button
            className="primary-cta"
            disabled={done[1]}
            onClick={() => !done[1] && open("meaning")}
          >
            {done[1] ? "Risk report reviewed" : "Reveal the risk report"} <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={img("risk-cycle-screen")} alt="" />
      </div>
    );
  if (s === 2)
    c = (
      <div className="wide-page">
        <h2>What the Risk Report Communicates</h2>
        <p className="lead">
          The risk report is built around a small number of things stakeholders
          actually need to know, not an exhaustive rundown of every entry in the
          register. Click each to explore.
        </p>
        <img
          className="section-illustration"
          src={img("report-communicates-screen")}
          alt=""
        />
        <div className="card-grid two">
          {[
            ["sources", "Sources of Overall Project Risk", Layers3],
            ["metrics", "Summary Metrics Across Individual Risks", BarChart3],
          ].map(([k, t, I]) => {
            const isRead = seen.includes(k);
            return (
              <button
                key={k}
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setSeen((v) => (v.includes(k) ? v : [...v, k]));
                  open(k);
                }}
              >
                <span className="card-icon">
                  <I size={28} />
                </span>
                <strong>{t}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
        {seen.length === 2 && (
          <button
            className="primary-cta centered"
            disabled={done[2]}
            onClick={() => !done[2] && open("example")}
          >
            {done[2] ? "Worked example reviewed" : "Reveal the worked example"} <ArrowRight />
          </button>
        )}
      </div>
    );
  if (s === 3)
    c = (
      <div className="hero-layout">
        <div>
          <h2>Why the Report Is Built Progressively</h2>
          <p className="lead">
            This document is never treated as finished. And that’s not an
            oversight — it’s the entire point.
          </p>
          <button
            className="primary-cta"
            disabled={done[3]}
            onClick={() => !done[3] && open("progressive")}
          >
            {done[3] ? "Progressive report reviewed" : "Reveal why it stays current"} <ArrowRight />
          </button>
        </div>
        <img
          className="lesson-art"
          src={img("progressive-report-screen")}
          alt=""
        />
      </div>
    );
  if (s === 4)
    c = (
      <div className="wide-page">
        <h2>Register Versus Report — Why Both Exist</h2>
        <p className="lead">
          It’s worth being precise about why these two documents exist side by
          side rather than one replacing the other. Flip both cards to see who
          each one actually serves.
        </p>
        <img
          className="section-illustration"
          src={img("register-report-screen")}
          alt=""
        />
        <div className="flip-grid">
          {cards.map((f, i) => (
            <div className="illustrated-flip" key={f.title}>
              <img className="flip-card-art" src={img(f.image)} alt="" />
              <button
                className={`flip ${flips.includes(i) ? "flipped" : ""}`}
                onClick={() => setFlips((v) => (v.includes(i) ? v : [...v, i]))}
              >
                <div className="flip-inner">
                  <div className="flip-front">
                    <small>CLICK TO FLIP</small>
                    <h3>{f.title}</h3>
                  </div>
                  <div className="flip-back">
                    <small>{f.tag}</small>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
        {flips.length === 2 && (
          <>
            <p className="callout">
              Handing a sponsor the full register instead of a report buries the
              signal they actually need under detail they don’t. Handing a risk
              owner only the report, with no register entry to work from, leaves
              them without the specific trigger and response information they
              need to actually manage their assigned risk. Each document earns
              its place by serving a different audience with a different need.
            </p>
            <button
              className="knowledge-cta centered"
              disabled={done[4]}
              onClick={() => !done[4] && setShowQuiz(true)}
            >
              {done[4] ? (
                <><Check /> Knowledge check completed</>
              ) : (
                <><Target /> Start knowledge check <ArrowRight /></>
              )}
            </button>
          </>
        )}
      </div>
    );
  if (s === 5)
    c = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={img("exam-captain-report")} alt="" />
        </div>
        <div>
          <h2>Synthesis (Exam Lens)</h2>
          <p className="lead">
            Back to the captain’s report one more time — because headquarters
            was never asking for the logbook. They were asking whether the ship
            is still on course.
          </p>
          <button
            className="primary-cta"
            disabled={done[5]}
            onClick={() => !done[5] && open("exam")}
          >
            {done[5] ? "Exam lens reviewed" : "Reveal the exam lens"} <ArrowRight />
          </button>
        </div>
      </div>
    );
  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select">
          <Award />
          <span>PMP Project Management Professional</span>
          <ChevronDown />
        </button>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${i < 5 ? "done" : i === 5 ? "active" : ""}`}
                key={i}
              >
                {i < 5 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 /> : <VolumeX />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="ghost-button">
            <X />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {s + 1} OF 6</p>
              <div>
                {tabs.map((x, i) => (
                  <button
                    className={`${done[i] ? "done" : ""} ${s === i ? "active" : ""}`}
                    key={x}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check />}
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{c}</div>
            {done[s] && (
              <p className="completion">
                <Check /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!s}
                onClick={() => go(s - 1)}
              >
                <ArrowLeft /> Previous
              </button>
              <button
                className={`primary-button ${done[s] ? "unlocked" : ""}`}
                disabled={!done[s]}
                onClick={() => s < 5 && go(s + 1)}
              >
                Continue <ArrowRight />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal
          d={modal}
          close={() => setModal(null)}
          read={() => {
            if (modal.after) modal.after();
            else if (s === 2 && seen.length < 2) {
            } else mark();
          }}
        />
      )}
      {showQuiz && (
        <Quiz
          finish={() => {
            mark(4);
            setShowQuiz(false);
          }}
        />
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
