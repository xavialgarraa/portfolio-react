// Expone la posición del ratón como vars CSS (--mx/--my)
// para el efecto .spotlight-card definido en index.css.
export const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};
