const id = "ask";
const name = "Ask!";
const title =
  "Ask! is a smart contract language designed based on AssemblyScript and running on Substrate FRAME Contracts.";
const description =
  "Ask! uses the similar way to ink! of designing the procedural macro in the form of eDSL, to write contracts by providing annotation type in AssemblyScript (aka AS). This way can hide the implementation details of the contract, and reduces the difficulty of writing contract. Ask! will be similar to ink!’s existing implementation, and the final product will maintain maximum compatibility with ink!’s existing standards. The WASM and metadata files compiled by Ask! can be deployed on the Substrate chain and run normally.";
const logo = "ask-logo.svg";
const startTime = 1610334804000;
const relatedLinks = [
  {
    link: "https://github.com/patractlabs/ask",
    description: "Github Repo",
  },
  {
    link: "https://patract.io/",
    description: "Patract Hub Website",
  },
];

const proposals = [
  {
    token: "ksm",
    amount: 1661,
    proposalId: 66,
    proposeTimePrice: 69,
    title:
      "Ask! v0.1: Define specifications of contract writing and contract method description; encapsulate on-chain interactive API and functional components.",
    achievements: [
      "this version had provided an Ask! contract framework that can be used normally (not compatible with ink! yet), including compilation, uploading, deploying, instantiating, and executing in the FRAME Contracts.",
    ],
  },
];

module.exports = {
  id,
  name,
  logo,
  startTime,
  title,
  description,
  proposals,
  relatedLinks,
};
