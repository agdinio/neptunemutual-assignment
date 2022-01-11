import { useState } from 'react';
import styled from 'styled-components'

const CryptoConverter = ({showDetails}) => {
    const [nep, setNep] = useState('');
    const [busd, setBusd] = useState('');

    const isNumber = (e) => {
        const charCode = (e.which) ? e.which : e.keyCode;
        if (charCode == 46) {
            //Check if the text already contains the . character
            if (e.target.value.indexOf('.') > -1) {
                e.preventDefault();
            }
        } else {
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                e.preventDefault();
        }
    }

    const handleNepToBusdChange = (e) => {
        if (e.target.value) {
            setNep(e.target.value);
            setBusd((e.target.value * 3).toFixed(2)  );
        } else {
            setNep('');
            setBusd('');
        }
    }

    const handleBusdToNepChange = (e) => {
        if (e.target.value) {
            setBusd(e.target.value);
            setNep( (e.target.value / 3).toFixed(2) );
        } else {
            setNep('');
            setBusd('');
        }
    }

    const handleCheckWalletDetails = () => {
        showDetails(true);
    }

    return (
        <Container>
            <Section marginBottom="20">
                <SectionHeaderText>Crypto converter</SectionHeaderText>
            </Section>
            <Section>
                <Label>NEP</Label>
            </Section>
            <Section marginBottom="40">
                <FormInput
                    placeholder="0.00"
                    value={nep}
                    onChange={handleNepToBusdChange}
                    onKeyPress={isNumber}
                />
            </Section>
            <Section>
                <Label>BUSD</Label>
            </Section>
            <Section>
                <FormInput
                    placeholder="0.00"
                    value={busd}
                    onChange={handleBusdToNepChange}
                    onKeyPress={isNumber}
                />
            </Section>
            <Section>
                <SubSectionCenter>
                    <a
                        href="javascript:void(0);"
                        onClick={handleCheckWalletDetails}
                        style={{fontSize:"14px", fontWeight:"bold", textDecoration:"none"}}
                    >Check Wallet Details</a>
                </SubSectionCenter>
            </Section>
        </Container>
    )

}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #fff;
    padding: 40px;
    border-radius: 7px;
    position: absolute;
`

const Section = styled.div`
    margin-bottom: ${props => props.marginBottom || 0}px;
    margin-top: ${props => props.marginTop || 0}px;
`

const SubSectionCenter = styled.div`
    width: 300px;
    text-align: center
`

const Label = styled.span`
    font-family: Arial;
    font-size: 18px;
    color: #000;
    line-height: 1;
    margin-bottom: 10px;
`

const SectionHeaderText = styled.span`
    font-family: Arial;
    font-size: 32px;
    font-weight: bold;   
    color: #000;
    line-height: 1;
`

const FormInput = styled.input`
    width: 300px;
    height: 35px;
    font-size: 20px;
    border-radius: 5px;
    padding-left: 5%;
`


export default CryptoConverter;