import { useEffect, useState } from 'react';
import styled from 'styled-components'
import IconClose from './assets/images/icon-close.png'
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

const WalletDetails = ({close}) => {
    const { active, activate, deactivate, error } = useWeb3React();
    const [isMetamaskConnected, setMetamaskConnected] = useState(false);
    const [address, setAddress] = useState('');
    const [chainId, setChainId] = useState(0);
    const [balance, setBalance] = useState(0);
    const connector = new InjectedConnector({});

    const handleConnect = async () => {

        const {ethereum} = window;

        if (ethereum && ethereum.on && !active) {
            await activate(connector);
            setMetamaskConnected(true);
        }
    }

    const handleClose = () => {
        close();
    }


    const handleDisconnect = () => {
        console.log('DISCONNECTING...')
        deactivate();
    }

    const truncate = (str) => {
        return str?.length > 10 ? str.substr(0, 4) + "..." + str.slice(-4) : str;
    }

    useEffect(() => {
        const {ethereum} = window;

        if (ethereum && ethereum.isMetaMask) {
            ethereum.on('accountsChanged', (accounts) => {
                setAddress(accounts[0]);
            });
            ethereum.on('chainChanged', (chainId) => {
                setChainId(parseInt(chainId, 16));
            });
        }
    })

    useEffect(() => {
        (async () => {
                const {ethereum} = window;
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const accounts = await provider.listAccounts();
                    // console.log('accounts:', accounts)
                    if (accounts.length < 1) {
                        setMetamaskConnected(false);
                    } else {
                        setMetamaskConnected(true);

                        // await provider.send("eth_requestAccounts", []);
                        const signer = provider.getSigner();
                        const bal = await signer.getBalance();
                        const network = await provider.getNetwork();
                        setAddress(accounts[0]);
                        setChainId(network.chainId);
                        setBalance(parseFloat(ethers.utils.formatEther(bal.toString())).toFixed(2));
                    }
                }
            }
        )();
    }, [isMetamaskConnected, address, chainId]);

    return (
        <Container>
            <Box>
                <BoxHeader>
                    <Text fontSize="18" color="#000" bold>Wallet Details</Text>
                    <img src={IconClose} height="18px" style={{cursor: "pointer"}} onClick={close}/>
                </BoxHeader>
                {
                    isMetamaskConnected ? (
                        <BoxContent>
                            <BoxDetails>
                                <BoxDetailsRow>
                                    <Text fontSize="13" color="rgba(0,0,0,0.7)">KEY</Text>
                                    <Text fontSize="13" color="rgba(0,0,0,0.7)">VALUE</Text>
                                </BoxDetailsRow>
                                <BoxDetailsRow borderBottom>
                                    <Text fontSize="15" color="rgba(0,0,0,0.7)" bold>Account</Text>
                                    <Text fontSize="15" color="rgba(0,0,0,0.7)" bold>{truncate(address) || 'loading...'}</Text>
                                </BoxDetailsRow>
                                <BoxDetailsRow borderBottom>
                                    <Text fontSize="15" color="rgba(0,0,0,0.7)" bold>Chain ID</Text>
                                    <Text fontSize="15" color="rgba(0,0,0,0.7)" bold>{chainId || 'loading...'}</Text>
                                </BoxDetailsRow>
                                <BoxDetailsRow borderBottom>
                                    <Text fontSize="15" color="rgba(0,0,0,0.7)" bold>Balance</Text>
                                    <Text fontSize="15" color="rgba(0,0,0,0.7)" bold>{balance || 'loading...'}</Text>
                                </BoxDetailsRow>
                            </BoxDetails>
                            <BoxFooter>
                                <Button label="Disconnect" color={'#fff'} backgroundColor={'#C83B3A'} widthInPct="100" onClick={handleDisconnect}/>
                            </BoxFooter>
                        </BoxContent>
                    ) : (
                        <BoxContent>
                            <BoxDetails>
                                <Text fontSize="18" color="#ff0000" lineHeight="1.4">Wallet not connected. Please click the "Connect Now" button below.</Text>
                            </BoxDetails>
                            <BoxFooter>
                                <Button label="Connect" color={'#fff'} backgroundColor={'#3388D1'} onClick={handleConnect}/>
                                <Button label="Cancel" color={'#000'} backgroundColor={'#E5E9ED'} onClick={handleClose}/>
                            </BoxFooter>
                        </BoxContent>
                    )
                }
            </Box>
        </Container>
    )
}

export default WalletDetails;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
    position: absolute;
    background: rgba(0,0,0, 0.9);
`

const Box = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 20px;
    border-radius: 5px;
`

const BoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`

const Text = styled.span`
    font-size: ${props => props.fontSize}px;
    color: ${props => props.color || '#000'};
    ${props => props.bold ? 'font-weight: bold' : ''};
    line-height: ${props => props.lineHeight || 1};
`

const BoxContent = styled.div`
    display: flex;
    flex-direction: column;
`

const BoxDetails = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 40px;
`

const BoxFooter = styled.div`
    display:flex;
    justify-content: space-between;
`

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.widthInPct || 48}%;
    height: 40px;
    border-radius: 5px;
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    cursor: pointer;
    &:after {
        content: '${props => props.label}';
        font-size: 16px;
        font-weight: bold;
    }
`

const BoxDetailsRow = styled.div`
    display: flex;
    justify-content: space-between;
    ${props => props.borderBottom ? 'border-bottom: 1px solid rgba(0,0,0,0.1);' : ''};
    padding: 20px;
    
`