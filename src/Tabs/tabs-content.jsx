import Tabs from "./tabs"

function RandomContent() {
    return (
        <h1 className="text-orange-500 text-2xl">This some of content</h1>
    )
}

export default function Tabscontent() {

    

    const tab = [
        {
            label: "Tab1",
            content: <div>This is content for <span className="text-red-700 text-3xl">tab1</span></div>
        },
        {
            label: "Tab2",
            content: <div>This is content for <sapn className="text-red-500 text-3xl">tab2</sapn></div>
        },
        {
            label: "Tab3",
            content: <RandomContent />
        }
    ]

    function handleChange(currentTabindex) {
        console.log(currentTabindex)
    }

    return <Tabs tabscontent={tab} onChange={handleChange} />
}