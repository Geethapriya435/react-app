import React, { useState, useEffect } from 'react';



const QRScanner = () => {

  const [clicked,setClicked] = useState('');
  const [error,setError] = useState('');
  const [credential, setCredential] = useState('');

  const generateRandomString = (length) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => String.fromCharCode(byte)).join('');
  };


  const handleLogin = async () => {
    console.log('clicked button');
    setClicked(true)

    const challengeFromClient = generateRandomString(32);
    if (navigator.credentials) {
      const publicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from(challengeFromClient, (c) => c.charCodeAt(0)),
        rp: {
          name: "Login",
          id: window.location.hostname,
        },
        user: {
          id: Uint8Array.from("UZSL85T9AFC", (c) => c.charCodeAt(0)),
          name: "geetha",
          displayName: "geetha",
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },
          { alg: -257, type: "public-key" },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
        },
        timeout: 60000,
        attestation: "direct",
      };
      try {
        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions,
        });
        console.log(credential);
        setCredential(credential);
      } catch (error) {
        console.error('WebAuthn error:', error);
        setError(error)
      }
     }else {
      console.error('Web Authentication API is not supported in this browser.');
      setError(error)
    }
  }
    return (
      <div>
        <button onClick={handleLogin}>Login</button>
        <p>{clicked.toString()}</p>
        <p>{credential.id}</p>
        {error && <p>Error: {error.message}</p>}
      </div>
    );

    
  
};

export default QRScanner;
