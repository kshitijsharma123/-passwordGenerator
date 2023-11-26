
import { useState, useRef, useEffect, useCallback } from 'react'




// The useCallBack hook in react is use when we want to re-render a component when a different component is used or click, the component is written as dependence inside a array.
//  const variable = useCallBack(fn,[]);
// fn is fired when there is a change in the dependence


function App() {



  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy")


  const copyPasswordToclopboard =
    useCallback(() => {
      window.navigator.clipboard.writeText(Password)
      passowrdRef.current?.select();

    }, [Password])

    const passwordGeneration = useCallback(() => {
      let pass = "";
      let str = "ADCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurtuvwxyz";
      if (numberAllowed) str += "1234567890";
      if (charAllowed) str += "@#!%^&";
      
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword]);
    useEffect(() => {
      
      passwordGeneration();
    }, [length, numberAllowed, charAllowed, passwordGeneration])
    const passowrdRef = useState(null)

  return (
    <>
      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className="text-center text-white">
          Passoword Generator
        </h1>
        <input type="text" value={Password} className="outline-none w-full py-1 px-3 bg-white" placeholder='password' readOnly
          ref={passowrdRef}


        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToclopboard}> {copy}</button>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" name="" id="" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {
              setlength(e.target.value)
            }} />
            <label className='text-white' >Length:{length}</label>

          </div>
          <div className="flex items-center gap-x-1">
            <input type='checkbox' defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed(prev => !prev)
              }}
            />
            <label className='text-white'>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type='checkbox' defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed(prev => !prev)
              }}
            />
            <label className='text-white'>Char</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
