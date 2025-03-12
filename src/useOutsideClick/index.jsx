import { useEffect } from "react";

export default function useOutsideClick(ref, handler) {
    useEffect(() => {
        function handleOutsideClick(event) {
            // Ensure ref.current exists before checking contains
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [ref, handler]);
}
