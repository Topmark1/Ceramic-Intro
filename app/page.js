"use client"

import styles from "../styles/globals.css";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { useViewerConnection } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";

import RecordSetter from "../component/RecordSetter.js"
// import { useViewerRecord } from "@self.id/react";

// function RecordSetter() {
//   const [name, setName] = useState("");
//   const record = useViewerRecord("basicProfile");

// const updateRecordName = async (name) => {
//   await record.merge({
//     name: name,
//   });
// };
// return (
//   <div className="content">
//     <div className="mt2">
//       {record.content ? (
//         <div className="flexCol">
//           <span className="subtitle">Hello {record.content.name}!</span>

//           <span>
//             The above name was loaded from Ceramic Network. Try updating it
//             below.
//           </span>
//         </div>
//       ) : (
//         <span>
//           You do not have a profile record attached to your 3ID. Create a basic
//           profile by setting a name below.
//         </span>
//       )}
//     </div>

//     <input
//       type="text"
//       placeholder="Name"
//       value={name}
//       onChange={(e) => setName(e.target.value)}
//       className="mt2"
//     />
//     <button onClick={() => updateRecordName(name)}>Update</button>
//   </div>
// );
// }

export default function HomePage() {
  const web3ModalRef = useRef();
  const [connection, connect, disconnect] = useViewerConnection();

const getProvider = async () => {
  const provider = await web3ModalRef.current.connect();
  const wrappedProvider = new Web3Provider(provider);
  return wrappedProvider;
};
useEffect(() => {
  if (connection.status !== "connected") {
    web3ModalRef.current = new Web3Modal({
      network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }
}, [connection.status]); 

const connectToSelfID = async () => {
  const ethereumAuthProvider = await getEthereumAuthProvider();
  connect(ethereumAuthProvider);
};

const getEthereumAuthProvider = async () => {
  const wrappedProvider = await getProvider();
  const signer = wrappedProvider.getSigner();
  const address = await signer.getAddress();
  return new EthereumAuthProvider(wrappedProvider.provider, address);
};

return (
  <div className="main">
    <div className="navbar">
      <span className="title">Ceramic Demo</span>
      {connection.status === "connected" ? (
        <span className="subtitle">Connected</span>
      ) : (
        <button
          onClick={connectToSelfID}
          className="button"
          disabled={connection.status === "connecting"}
        >
          Connect
        </button>
      )}
    </div>

    <div className="content">
      <div className="connection">
        {connection.status === "connected" ? (
          <div>
            <span className="subtitle">
              Your 3ID is {connection.selfID.id}
            </span>
            <RecordSetter />
          </div>
        ) : (
          <span className="subtitle">
            Connect with your wallet to access your 3ID
          </span>
        )}
      </div>
    </div>
  </div>
);
}