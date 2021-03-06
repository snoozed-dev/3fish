import { useCallback, useEffect } from "react";

export const useKeypresses = ({
  actionKeymap,
}: {
  actionKeymap: Record<string, () => unknown>;
}) => {
  const onKeypress = useCallback(
    (evt: KeyboardEvent) => {
      const action = actionKeymap[evt.code];
      if (action) {
        evt.preventDefault();
        action();
        evt.stopImmediatePropagation();
      } else {
        console.debug(`Unassigned keycode: [${evt.code}]`);
        evt.stopImmediatePropagation();
      }
    },
    [actionKeymap]
  );

  useEffect(() => {
    window.addEventListener("keypress", onKeypress);
    return () => {
      window.removeEventListener("keypress", onKeypress);
    };
  }, [onKeypress]);
};
