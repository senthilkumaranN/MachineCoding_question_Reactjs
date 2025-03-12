import React, { useEffect, useState } from 'react'

function Square({ value, onClick }) {
    return (
        <button onClick={onClick} className='border-[1px] border-red-500 float-left
        h-[100px] text-[40px] p-0 text-center w-[100px]
        mr-[-1px] mt-[-1px] cursor-pointer'>{value}</button>
    )
}
const TicTacToe = () => {
    const [square, setSquare] = useState(Array(9).fill(''))
    const [isXturn, setisXturn] = useState(true)
    const [status, setstatus] = useState("")

    function getWinner(square) {
        const WinnerPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < WinnerPatterns.length; i++) {
            const [x, y, z] = WinnerPatterns[i]

            if (square[x] && square[x] === square[y] && square[x] === square[z]) {
                return square[x]
            }
        }

    }

    function handlerestart(){
           setisXturn(true)
           setSquare(Array(9).fill(''))
    }



    function handleClick(getCurrentSquare) {
        let cpySquare = [...square]
        if (cpySquare[getCurrentSquare]) return;
        cpySquare[getCurrentSquare] = isXturn ? "X" : "O"
        setisXturn(!isXturn)
        setSquare(cpySquare)
    }

    useEffect(() => {
        if (!getWinner(square) && square.every((item) => item !== "")) {
            setstatus(`This is a draw ! Please restart the game`)
        } else if (getWinner(square)) {
            setstatus(`Winner is ${getWinner(square)}`)
        } else {
            setstatus(`Next player is ${isXturn ? 'X' : 'O'}`)
        }
    }, [square, isXturn])




    return (
        <div className='min-h-screen flex flex-col justify-center items-center mt-4'>
            <div>
                <Square value={square[0]} onClick={() => handleClick(0)} />
                <Square value={square[1]} onClick={() => handleClick(1)} />
                <Square value={square[2]} onClick={() => handleClick(2)} />
            </div>
            <div className=''>
                <Square value={square[3]} onClick={() => handleClick(3)} />
                <Square value={square[4]} onClick={() => handleClick(4)} />
                <Square value={square[5]} onClick={() => handleClick(5)} />
            </div>
            <div className=''>
                <Square value={square[6]} onClick={() => handleClick(6)} />
                <Square value={square[7]} onClick={() => handleClick(7)} />
                <Square value={square[8]} onClick={() => handleClick(8)} />
            </div>
            <h2 className='my-3 text-2xl font-bold'>{status}</h2>
            <button  onClick={handlerestart}
             className='my-3 text-2xl font-bold bg-red-600 px-2 py-1 rounded-lg text-white hover:text-black
            '>Restart</button>
        </div>
    )
}

export default TicTacToe