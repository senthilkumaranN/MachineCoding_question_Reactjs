import { useCallback } from "react";

export default function useScroll() {

    // Scroll to the top of the page
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Scroll to the bottom of the page
    const scrollToBottom = useCallback(() => {
        window.scrollTo({  top: document.body.scrollHeight || document.documentElement.scrollHeight, behavior: "smooth" });
    }, []);

  

    return { scrollToTop, scrollToBottom };
}
