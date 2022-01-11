import { useState } from 'react';
import styled from 'styled-components'
import CryptoConverter from "./CryptoConverter";
import WalletDetails from "./WalletDetails";

const Home = () => {
    const [isDetailsShowing, setDetailsShowing] = useState(false);

    const handleShowDetails = () => {
        setDetailsShowing(true);
    }

    const handleClose = () => {
        setDetailsShowing(false);
    }

    return (
        <Container>
            <CryptoConverter showDetails={handleShowDetails}/>
            {
                isDetailsShowing ? <WalletDetails close={handleClose}/> : null
            }
        </Container>
    )
}


export default Home;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
`
