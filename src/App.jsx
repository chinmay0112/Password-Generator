import { useCallback, useState, useEffect, useRef } from "react";

import "./index.css";

function App() {
  const [length, setLength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select(); //selects all elements to be copied

    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (NumberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*()_+{}[]~`";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, NumberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, NumberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 text-center">
        <h1 className="text-white text-center font-bold my-2 py-2">
          Password Generator
        </h1>
        <div className="flex shadow overflow-hidden mb-1 py-3">
          <input
            type="text"
            readOnly
            value={password}
            className="outline-none w-full py-1 px-3 rounded-l-lg font-semibold"
            placeholder="password"
            ref={passwordRef}
          ></input>
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-r-lg"
            onClick={copyPasswordtoClipboard}
          >
            copy
          </button>
        </div>
        <div className=" flex text-sm gap-x-2 py-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          ></input>
          <label>Length: {length}</label>{" "}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={NumberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            ></input>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          ></input>
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
