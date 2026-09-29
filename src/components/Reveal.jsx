import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
