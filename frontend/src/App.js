import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/Navbar ';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal, { providers } from 'web3modal'

import contract from './artifacts/contracts/TodoList.sol/TodoList.json';
const contractAddress = '0xe264F387c6116d3615B531C8ea1DFc263AFEb698';


function App() {
  const [todos, setTodos] = useState([]);
  const [signerAddress, setSignerAddress] = useState('');
  const tRef = useRef('');
  const [loadingState, setLoadingState] = useState('loaded')

  const FetchTodos = async () => {
    const web3modal = new Web3Modal();
    const instance = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const todoContract = new ethers.Contract(contractAddress, contract.abi, signer);

    const data = await todoContract.fetchTasks();
    const items = await Promise.all(data.map(i => {
      let item = {
        id: i.id.toNumber(),
        content: i.content,
        complete: i.completed
      }

      return item;
    }));
    console.log(items);
    setTodos([...items]);
  }

  const createTask = async (content) => {
    if(!window.ethereum) {
      alert('Please install MetaMask');
      return
    }
    try {
      setLoadingState('loading');
      const web3modal = new Web3Modal();
      const instance = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const todoContract = new ethers.Contract(contractAddress, contract.abi, signer);

      const tx = await todoContract.createTask(content)
      await tx.wait();
      FetchTodos()
      setLoadingState('loaded');
    } catch (e) {
      setLoadingState('loaded');
    }

  }

  const toggleStatus = async (e, id) => {
    if(!window.ethereum) {
      alert('Please install MetaMask');
      return
    }
    try {
      setLoadingState('loading');
      const web3modal = new Web3Modal();
      const instance = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const todoContract = new ethers.Contract(contractAddress, contract.abi, signer);

      const tx = await todoContract.toggleComplete(id);
      await tx.wait();
      FetchTodos();
      setLoadingState('loaded');
    } catch(e) {
      setLoadingState('loaded');
    }
  }


  const connectWallet = async () => {
    if(!window.ethereum) {
      alert('Please install MetaMask');
      return
    }
    const web3modal = new Web3Modal();
    const instance = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    setSignerAddress(await signer.getAddress());
    FetchTodos()

  }

  const submitForm = () => {
    if(tRef.current.value !== '') {
      createTask(tRef.current.value);
      tRef.current.value = '';
    }
  }

  useEffect(() => {
    if(window.ethereum && window.ethereum.isMetaMask) {
      FetchTodos()
    } else {
      alert('Please install MetaMask');
    }
  }, []);

  if (loadingState === 'loading') return (
    <div>
      <Navbar1 address={signerAddress} connectWallet={connectWallet} setAdd={setSignerAddress} />
      <div className="container">
        <h3 className='text-center mt-5'>Loading...</h3>
      </div>
    </div>
  )

  return (
    <div>
      <Navbar1 address={signerAddress} connectWallet={connectWallet} setAdd={setSignerAddress} />
      <div className="container">
        <div className='mt-5 w-50 mx-auto'>
          <Input placeholder='Enter Todos' innerRef={tRef} />
          <Button className="w-100 mt-3" color="primary" onClick={submitForm}>Submit</Button>
        </div>

        <div className="listTodos w-50 mx-auto mt-5 ">
          <div>
            <h3>Todo List</h3>
          </div>
          <div className="mt-4">
            {
              todos && (
                todos.map((item, i) => {
                  return (
                    <div key={i}>
                      <FormGroup check>
                        <Label check>
                          {item.content}
                          <Input type="checkbox" checked={item.complete} onChange={e => { toggleStatus(e, item.id) }} />
                        </Label>
                      </FormGroup>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
