import { Button, Navbar, NavbarBrand } from "reactstrap"
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import identicon from 'identicon.js'


function Navbar1({ address, connectWallet, setAdd}) {

    return (
        <div>
            <Navbar
                color="dark"
                expand="md"
                dark
            >
                <NavbarBrand>
                    TodoList Blockchain Application
                </NavbarBrand>
                <div className="d-flex flex-column flex-sm-row w-100 justify-content-center justify-content-md-end">
                    <div>
                        {address && (
                            <div>
                                <p className="text-secondary m-2 mr-4 text-end mb-0">
                                    <span>
                                        <img
                                            className="me-2"
                                            width={30}
                                            height={30}
                                            src={`data:image/png;base64,${new identicon(address, 30).toString()}`}
                                        />
                                        <span>{address}</span>
                                    </span>
                                </p>
                                <p className="text-end mb-0" style={{cursor: 'pointer'}}><a className="text-secondary text-decoration-none" onClick={e => setAdd('')}>Disconnect</a></p>
                            </div>
                        )}
                      
                    </div>
                    {!address && (
                        <div>
                            <Button className="w-100" color="primary" onClick={connectWallet}>Connect</Button>
                        </div>
                    )}
                </div>
            </Navbar>

        </div>
    )
}

export default Navbar1
