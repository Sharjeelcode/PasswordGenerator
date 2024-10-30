import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [lenght, setLenght] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState("");
  const [oldPass, setOldPass] = useState([]);
  const passRef = useRef(null);
  useEffect(() => {
    passwordGenerator();
  }, [lenght, number, character, setpassword]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "012345678";
    }
    if (character) {
      str += '!"£$%^&*()_+@';
    }
    for (let i = 0; i < lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [lenght, number, character, setpassword]);
  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setOldPass((prev) => [...prev, password]);
    passwordGenerator();
  }, [password, oldPass]);
  return (
    <>
      <h1 className="text-2xl md:text-4xl bg-black text-center text-white py-2">
        Password Generator
      </h1>
      <div className="flex justify-center bg-black min-h-[100vh] min-w-[100vw] md:w-auto">
        <div className="mt-4 ">
          <div className=" bg-gray-600 rounded-lg p-3 mx-4 md:mx-0">
            <div className="flex ">
              <input
                type="text"
                value={password}
                className="text-lg w-[100%] md:w-auto outline-none rounded px-2"
                readOnly
                ref={passRef}
              />
              <button
                className="p-2 text-white bg-blue-600 rounded"
                onClick={copyPassword}
              >
                Copy
              </button>
            </div>
            <div className="flex text-white gap-3 flex-wrap ">
              <input
                type="range"
                min={8}
                max={32}
                value={lenght}
                onChange={(e) => setLenght(e.target.value)}
              />
              <span>Lenght: {lenght}</span>
              <label htmlFor="Numbers">Numbers</label>
              <input
                type="checkbox"
                id="Numbers"
                defaultChecked={number}
                onChange={() => setnumber((prev) => !prev)}
              />
              <label htmlFor="Characters">Characters</label>
              <input
                type="checkbox"
                id="Characters"
                defaultChecked={character}
                onChange={() => setcharacter((prev) => !prev)}
              />
            </div>
          </div>

          <div className="text-white bg-gray-600 rounded-xl mx-4">
            <h1 className="text-center text-3xl pb-1 mt-4">Old Passwords</h1>
            <ul className="px-8 list-decimal">
              {oldPass.map((pass) => (
                <li>{pass}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
