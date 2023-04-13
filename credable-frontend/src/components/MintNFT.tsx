import * as buffer from "buffer";



window.Buffer = buffer.Buffer;

export default function App() {

  function handleClick() {
    const url = 'http://localhost:8080/mintnft';
    const data = {
      userName: 'John dee',
      score: 331
    };

    fetch(url, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }


  return (
    <div>
      <button onClick={handleClick} className='getDataBtn'> Mint NFT</button>
    </div>
  );
}
