import { createContext, useEffect, useState } from "react";
import featureFlagDataServiceCall from "./data";


export const FeatureFlagsContext = createContext();

export default function FeatureFlagsGlobalContext({ children }) {
    const [loading, setloading] = useState(false)
    const [enabledFlags, setenabledFlags] = useState({})

    async function fetchFeatureFlags() {
        try {
            setloading(true)
            const response = await featureFlagDataServiceCall();
            setenabledFlags(response)
            setloading(false)
        } catch (e) {
            console.log(e)
            setloading(false)
        }
    }

    useEffect(() => {
        fetchFeatureFlags();
    }, [])
    return (
        <FeatureFlagsContext.Provider value={{ loading, enabledFlags }}>
            {children}
        </FeatureFlagsContext.Provider>
    )
}