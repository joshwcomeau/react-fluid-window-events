import throttle from 'lodash/throttle';


export function rafThrottle(fn) {
  // Attempts to use requestAnimationFrame to throttle at 60fps.
  // Falls back to Lodash's throttle if unavailable
  let hasCompletedThisFrame = false;

  console.log("rafThrottle created")

  return () => {
    console.log("Trigger")
    if (!hasCompletedThisFrame) {
      hasCompletedThisFrame = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          fn();
          hasCompletedThisFrame = false;
        });
      } else {
        throttle(fn, 16);
      }
    }
  };
}
