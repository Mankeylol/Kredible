import * as buffer from "buffer";
import axios from 'axios'



window.Buffer = buffer.Buffer;

interface User {
  username: string;
  score: number;
}

export default function App(user: User) {

  async function handleClick() {
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/mintnft',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        userName: user.username,
        score: user.score,
      }
    }
    const response  = await axios.request(options)
    console.log(response)
  }


  return (
    <div className="main-form">
      <button onClick={handleClick} className='getDataBtn'> Mint NFT</button>
    </div>
  );
}
