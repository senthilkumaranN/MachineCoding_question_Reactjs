import React, { useContext, useRef, useState, useEffect } from "react"
import ScrollIndicator from "../scroll-indicator"
import DarkSwitchMode from "../Dark-Light"
import TicTacToe from "../Tic-tac-toe"
import Accordion from "../Accordion"
import ImageSlider from "../image-silder"
import ModelTest from "../Model-pop/Model-test"
import Tabscontent from "../Tabs/tabs-content"
import { FeatureFlagsContext } from "./Context"
import useScroll from "../useScrollHook"
import Github_Finder from "../Github-finder"
import LoadMoreBtn from "../Load-more-btn"
import SearchLogic from "../Search-AutoComplete"
import StarRating from "../starRating"
import useScrollToSection from "../useSectionScroll"


export default function FeatureFlags() {

    const { loading, enabledFlags } = useContext(FeatureFlagsContext)
    const [scrollpercentage, setscrollpercentage] = useState(0)
    const [activeSection, setActiveSection] = useState(null);
    const { scrollToTop, scrollToBottom } = useScroll()
    const sectionRefs = useRef({})
    const { scrollToSection } = useScrollToSection()



    const componentsToRender = [

        {
            key: "showLightAndDarkMode",
            label: "Dark Mode",
            component: <DarkSwitchMode />
        },
        {
            key: "showTicTacToeBoard",
            label: "TicTacToe",
            component: <TicTacToe />
        },
        {
            key: "showAccordion",
            label: "Accordion",
            component: <Accordion />
        },
        {
            key: "showImageSlider",
            label: "ImageSlider",
            component: <ImageSlider url={'https://picsum.photos/v2/list'} page={'1'} limit={'10'} />
        },
        {
            key: "showModelPop",
            label: "ModelPop",
            component: <ModelTest />
        },
        {
            key: "showTabs",
            label: "TabContent",
            component: <Tabscontent />
        },
        {
            key: "showGitHubFinder",
            label: "GitHubFinder",
            component: <Github_Finder />
        },
        {
            key: "showLoadMore_Btn",
            label: "LoadMoreButton",
            component: <LoadMoreBtn />
        },
        {
            key: "showSearchAutoComplete",
            label: "SearchAutoComplete",
            component: <SearchLogic />
        },
        {
            key: "showStarRating",
            label: "StarRating",
            component: <StarRating noOfStars={10} />
        }
    ]

    function handlescrollpercentage() {

        const howmuchscroll = document.body.scrollTop || document.documentElement.scrollTop

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

        if (height === 0) {
            setscrollpercentage(100)
        } else {
            setscrollpercentage((howmuchscroll / height) * 100)
        }

        // Update active section
        let currentSection = null;
        for (let key of Object.keys(sectionRefs.current)) {
            const ref = sectionRefs.current[key]?.current;
            if (ref) {
                const rect = ref.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) {
                    currentSection = key;
                }
            }
        }
        setActiveSection(currentSection);
        

    }


    function checkEnabledFlags(getCurrentkey) {
        return enabledFlags[getCurrentkey]
    }

    useEffect(() => {
        window.addEventListener("scroll", handlescrollpercentage);

        return () => {
            window.removeEventListener("scroll", handlescrollpercentage);
        }
    }, [])

    useEffect(() => {
        componentsToRender.forEach((item) => {
            sectionRefs.current[item.key] = sectionRefs.current[item.key] || React.createRef();
        });
    }, []);


    if (loading) return <h1>Loading data ! Please Wait</h1>

    return (
        <>
            <div className="fixed top-[70px] right-[50%] translate-x-1/2 my-4 z-50">
                <button onClick={scrollToBottom} className="bg-blue-500 px-4 py-2 rounded-lg text-white shadow-md hover:bg-blue-600 transition">
                    Scroll to Bottom
                </button>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full h-[65px] bg-gray-900 text-white flex justify-around items-center shadow-lg">

                {componentsToRender.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => scrollToSection(sectionRefs.current[item.key], item.key)}
                        className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 
                                ${activeSection === item.key ? "bg-blue-500 text-white shadow-md" : "hover:bg-gray-700"}`}
                    >
                        {item.label}
                    </button>
                ))}

            </nav>

            {/* Scroll Progress Indicator */}
            <div className="fixed z-[1] top-[65px] w-full h-[5px] bg-gray-300">
                <div className="h-[5px] bg-blue-500 transition-all duration-300" style={{ width: `${scrollpercentage}%` }}></div>
            </div>

            {/* Sections */}
            <div className="min-h-[300vh] flex flex-col items-center space-y-10 mt-36">
                {componentsToRender.map((item) =>
                    checkEnabledFlags(item.key) ? (
                        <div
                            ref={sectionRefs.current[item.key]}
                            key={item.key}
                            className="w-11/12 md:w-3/4 lg:w-11/12 bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center 
                            transition-transform duration-500 hover:scale-105 border border-gray-200"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">{item.label}</h2>
                            <div className="w-full">{item.component}</div>
                        </div>
                    ) : null
                )}
            </div>

            {/* -------------------- */}


            {/* <div className="text-center  min-h-[300vh]">


                {
                    componentsToRender.map(componentItem => checkEnabledFlags(componentItem.key) ?
                        componentItem.component : null)
                }


            </div> */}


            <div className="text-center my-6">
                <button onClick={scrollToTop} className="bg-blue-500 px-4 py-2 rounded-lg text-white shadow-md hover:bg-blue-600 transition">
                    Scroll to Top
                </button>
            </div>
        </>
    )
}
