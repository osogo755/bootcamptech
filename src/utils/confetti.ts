import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    console.error('Confetti error:', e);
  }
};

export const triggerGraduationConfetti = () => {
  try {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {
    console.error('Graduation confetti error:', e);
  }
};
