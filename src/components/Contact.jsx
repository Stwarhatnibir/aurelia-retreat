import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1];

const initialValues = {
  name: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  message: "",
};

function validate(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = "Please tell us your name";
  if (!/^\S+@\S+\.\S+$/.test(v.email))
    errors.email = "Enter a valid email address";
  if (!v.checkIn) errors.checkIn = "Choose an arrival date";
  if (!v.checkOut) errors.checkOut = "Choose a departure date";
  else if (v.checkIn && v.checkOut <= v.checkIn)
    errors.checkOut = "Must be after arrival";
  return errors;
}

const inputClass =
  "w-full border-b border-cream/25 bg-transparent py-3 text-cream outline-none transition-colors duration-500 placeholder:text-cream/30 focus:border-gold [color-scheme:dark]";

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-[#e0917a]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </label>
  );
}

function SuccessMessage({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
    >
      <motion.svg
        viewBox="0 0 52 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-20 w-20 text-gold"
      >
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease }}
        />
        <motion.path
          d="M15 27l8 8 14-16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
        />
      </motion.svg>

      <h3 className="mt-8 font-display text-4xl">Thank you</h3>
      <p className="mt-4 max-w-xs text-cream/60">
        Your request is with us. We will reply within 24 hours with availability
        and a personal note.
      </p>
      <button
        onClick={onReset}
        className="mt-10 text-xs uppercase tracking-[0.3em] text-cream/60 transition-colors hover:text-gold"
      >
        Send another request
      </button>
    </motion.div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error as soon as the person edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New booking request from ${values.name}`,
          from_name: "Aurelia Retreat website",
          ...values,
        }),
      });
      const data = await res.json();

      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2 md:gap-24 md:px-10 md:py-40">
        {/* Left: details */}
        <div>
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
              Reservations
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              Begin your <br />
              quiet escape
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-sm leading-relaxed text-cream/60">
              Tell us when you would like to arrive. We personally reply to
              every request, usually within a day.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-12 space-y-3 text-sm text-cream/70">
              <p>hello@aurelia-retreat.com</p>
              <p>+91 98765 43210</p>
              <p>Darjeeling Hills, West Bengal</p>
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <SuccessMessage key="sent" onReset={reset} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <Field label="Full name" error={errors.name}>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Email" error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Arrival" error={errors.checkIn}>
                    <input
                      name="checkIn"
                      type="date"
                      value={values.checkIn}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Departure" error={errors.checkOut}>
                    <input
                      name="checkOut"
                      type="date"
                      value={values.checkOut}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Guests">
                  <select
                    name="guests"
                    value={values.guests}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n} className="bg-ink">
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Anything we should know? (optional)">
                  <textarea
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Celebrations, dietary needs, late arrival..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full border border-gold bg-gold py-4 text-xs uppercase tracking-[0.3em] text-white transition-all duration-500 hover:bg-transparent hover:text-gold disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Request booking"}
                </button>
                {status === "error" && (
                  <p className="text-center text-xs text-[#e0917a]">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
