import { useCallback } from "react";

export default function useScrollToSection() {
    const scrollToSection = useCallback((ref) => {
        if (ref?.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 70, // Adjust offset for navbar
                behavior: "smooth",
            });
        }
    }, []);

    return { scrollToSection };
}
