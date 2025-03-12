import React, { useEffect, useState } from 'react'

const Accordion = () => {
  const [loading, setloading] = useState(false)
  const [accordion, setaccordion] = useState([])
  const [selectTab, setselectTab] = useState("")
  const [enablemultiselect, setenablemultiselect] = useState(false)
  const [multiple, setmultiple] = useState([])
  console.log(accordion)
  async function fetchData() {
    try {
      setloading(true)
      const response = await fetch('https://dummyjson.com/quotes?limit=5&skip=10')
      const result = await response.json()
      console.log(result.quotes)

      if (result?.quotes && result?.quotes?.length > 0) {
        setaccordion(result.quotes)
        setloading(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  function handletab(id) {
    setselectTab(id === selectTab ? null : id)
  }
  function handleenablemulti(id) {
    let cpymultiple = [...multiple]
    const findindexofmultiple = cpymultiple.indexOf(id)

    if (findindexofmultiple === -1) {
      cpymultiple.push(id)
    } else {
      cpymultiple.splice(findindexofmultiple, 1)
    }

    setmultiple(cpymultiple)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <p className='text-center text-3xl'>Please Wait!</p>

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-slate-100">
      <button className="bg-blue-500 p-2 text-white rounded" onClick={() => setenablemultiselect(!enablemultiselect)}>
        Enable Multiselect
      </button>

      <div className="w-[500px] mt-3">
        {accordion?.map((item) => (
          <div key={item.id} className="bg-[#614101] mb-3 px-3 py-5">
            <div className='text-white flex justify-between items-center cursor-pointer'>
              <h3>{item.author}</h3>
              <span
                className=" p-2 rounded text-white hover:bg-red-700"
                onClick={enablemultiselect ? () => handleenablemulti(item.id) : () => handletab(item.id)}
              >
                +
              </span>
            </div>

            {selectTab === item.id || multiple.includes(item.id) ? (
              <div className="text-white h-auto">
                <h4>{item.quote}</h4>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>

  )
}

export default Accordion