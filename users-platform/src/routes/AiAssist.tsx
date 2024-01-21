import "regenerator-runtime/runtime";
import useClipboard from "react-use-clipboard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import Speech from "react-speech";
import OpenAI from "openai";

const voiceProps = {
  rate: 1, // Default rate
  pitch: 1, // Default pitch
  voice: {
    name: "Google UK English Female", // Voice name (example)
    lang: "en-IN", // Language (example)
  },
};

const OpenAI_API_KEY = import.meta.env.VITE_OpenAI_API_KEY;
console.log("Open API key: " + OpenAI_API_KEY);

const openAi = new OpenAI({
  apiKey: OpenAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const AiAssist = () => {
  const [listen, setListen] = useState(false);
  const [response, setResponse] = useState("");

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [isCopied, setCopied] = useClipboard(transcript, {
    successDuration: 1000,
  });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const aiResponse = async (input: string) => {
    const completion = await openAi.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: "gpt-3.5-turbo",
    });
    setResponse(completion.choices[0].message.content as string);
  };

  return (
    <>
      <div className="container">
        <h2>
          Hello, I am a professional legal adviser trained on Indian law data.
        </h2>
        <br />
        <p>Try getting answers to all your legal queries.</p>

        <div className="message-box">{transcript}</div>

        <div className="btn-style">
          <button
            onClick={() => {
              setListen(true);
              setCopied();
              aiResponse(transcript);
            }}
          >
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
        <div>{response}</div>
      </div>
      {listen ? (
        <Speech
          textAsButton={true}
          displayText="Listen"
          pause={true}
          resume={true}
          text={response}
          volume={0.5}
          voice={voiceProps}
        />
      ) : (
        <div> Not speaking now</div>
      )}
    </>
  );
};

export default AiAssist;
