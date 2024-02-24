import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { PiMicrophoneLight } from "react-icons/pi";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaUndo } from "react-icons/fa";
import { MdRecordVoiceOver, MdOutlineVoiceOverOff } from "react-icons/md";

const OpenAI_API_KEY = import.meta.env.VITE_OpenAI_API_KEY;

interface ChatElement {
  type: string;
  message: string;
}

const AiAssist = () => {
  const [listen, setListen] = useState(false);
  const [chatLog, setChatLog] = useState<ChatElement[]>([]);
  const [userInput, setUserInput] = useState("");
  const [speechInput, setSpeechInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (listen) {
      setSpeechInput(transcript);
    }
  }, [transcript, listen]);

  useEffect(() => {
    if (!listen) {
      resetTranscript();
    }
  }, [listen, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleSendButton = () => {
    if (userInput) {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "user", message: userInput },
      ]);
      aiResponse(userInput);
    }
    if (listen) {
      SpeechRecognition.stopListening();
      setListen(false);
    }
  };

  const handleListening = () => {
    setListen(true);
    resetTranscript();
    startListening();
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "user", message: speechInput },
      ]);
      aiResponse(speechInput);
    }

    resetTranscript();
    setListen(false);
  };

  const newFunction = async (text: string) => {
    try {
      const mp3 = await openAi.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: text,
      });

      const blob = new Blob([await mp3.arrayBuffer()]);
      const blobUrl = URL.createObjectURL(blob);
  
      return blobUrl;
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };


  const handleSpeechButton = async (botMessage: string) => {
    try {
      const audioUrl = await newFunction(botMessage);
      const audio = new Audio(audioUrl);

      audio.onloadedmetadata = () => {
        audio.play();
        setSpeaking(false); // Set speaking to false when audio starts playing
      };
      audio.onended = () => {
        setSpeaking(false); // Set speaking to false when audio finishes playing
      };
    } catch (error) {
      console.error('Error handling speech button:', error);
    } finally {
      setSpeaking(false);
    }
  };

  const aiResponse = async (input: string) => {
    try {
      let botMessage = "";
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OpenAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional legal assistant with 10 years of experience in Indian law. Provide sympathetic and accurate legal advice based on the specific details provided in the user's query. Ensure your responses comply with Indian legal regulations and standards.",
              },
              { role: "user", content: input },
            ],
            max_tokens: 1000,
            stream: true,
          }),
        }
      );

      if (!response.body) {
        console.error("Response body is not available.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const chunk = await reader.read();
        const { done, value } = chunk;
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim())
          .filter((line) => line !== "" && line !== "[DONE]")
          .map((line) => JSON.parse(line));

        for (const parsedLine of parsedLines) {
          const { choices } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          if (content) {
            botMessage += content;
            setChatLog((prevChatLog) => {
              const updatedChatLog = [...prevChatLog];
              if (
                updatedChatLog.length > 0 &&
                updatedChatLog[updatedChatLog.length - 1].type === "bot"
              ) {
                updatedChatLog[updatedChatLog.length - 1].message = botMessage;
              } else {
                updatedChatLog.push({ type: "bot", message: botMessage });
              }
              return updatedChatLog;
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      resetTranscript();
      setUserInput("");
    }
  };


  // Function to stop speech synthesis
  const stopSpeaking = () => {
    // audio.pause();
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="mt-10 font-poppins h-[500px] overflow-y-auto overflow-x-hidden">
      {/* heading big, sticky fixed like header */}
      <h1 className="text-5xl flex justify-center pb-3">Talk to Lexi</h1>

      {/* chatbox container + fix height */}
      <div className="px-28 max-md:px-5">
        <div className="flex flex-col items-end justify-center bg-slate-200 rounded-3xl p-4">
          {/* chatbox */}
          <div className="w-full overflow-auto p-4 mb-4">
            {/* chat log */}
            {chatLog.length > 0 ? (
              <div className="flex flex-col space-y-4 w-full">
                {chatLog.map((messageElement, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      messageElement.type === "user"
                        ? "justify-start"
                        : "justify-end w-full"
                    }`}
                  >
                    <div
                      className={`${
                        messageElement.type === "user"
                          ? "bg-white text-black"
                          : "bg-[#0C253F] text-white flex items-center gap-2"
                      } rounded-lg p-4 max-w-[80%]`}
                    >
                      {messageElement.type === "bot" && (
                        <div className="flex items-center gap-2">
                          {speaking ? (
                            <button type="button" onClick={stopSpeaking}>
                              <MdOutlineVoiceOverOff className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="relative"
                              onMouseEnter={() => setShowDiv(true)}
                              onMouseLeave={() => setShowDiv(false)}
                              onClick={() => handleSpeechButton(messageElement.message)}
                            >
                              <div className={`absolute top-[-100px] left-[-60px] bg-white w-[150px] rounded-lg p-2 shadow-md ${showDiv ? 'block' : 'hidden'}`}>
                                <p className="text-black">
                                  Click on the icon and wait for the audio to load.
                                </p>
                              </div>
                              <MdRecordVoiceOver className="w-5 h-5" />
                            </button>

                          )}
                        </div>
                      )}

                      {messageElement.message}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <h2 className="text-2xl max-md:text-xl">
                  Hello, I am Lexi, your professional legal adviser trained on
                  Indian law data.
                </h2>
                <p className="text-normal max-md:text-sm">
                  Have a legal question? I'm here to help! Whether it's related
                  to family law, contracts, property disputes, or any other
                  legal matter, feel free to ask.
                </p>
                <p className="text-normal max-md:text-sm">
                  I'm powered by advanced AI technology and have been trained on
                  a vast database of Indian legal information to provide
                  accurate and reliable answers to your queries.
                </p>
                <p className="text-normal max-md:text-sm">
                  Simply type your question in the chatbox below, or click on
                  the microphone icon to speak to me. I'll do my best to assist
                  you.
                </p>
                <p className="text-normal max-md:text-sm">
                  If you prefer to hear the answers, look for the voice icon next to my
                  responses and click it.
                </p>
              </div>
            )}
          </div>

          {/* Downward arrow icon button */}
          {/* {chatLog.length > 4 && !downButtonPressed && (
            <div className="flex justify-center w-full mb-2">
              <button onClick={scrollToBottom} title="Scroll to bottom">
                <FaArrowCircleDown className="text-[#0C253F] text-3xl" />
              </button>
            </div>
          )} */}
        </div>
      </div>

      {/* input */}
      <div className="w-screen flex justify-center relative fixed bottom-5 z-100">
        <div className="bg-white w-3/4 rounded-2xl flex items-center justify-between items-center border border-px border-black">
          {listen ? (
            <div className="w-full rounded-2xl focus:outline-none px-2 py-3">
              {speechInput ? (
                <p>{speechInput}</p>
              ) : (
                <p className="opacity-50">start speaking</p>
              )}
            </div>
          ) : (
            <TextareaAutosize
              minRows={1}
              maxRows={4}
              className="w-full rounded-2xl focus:outline-none px-2 pt-3"
              style={{ display: "flex", alignItems: "center" }}
              placeholder="Type here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendButton();
                }
              }}
            />
          )}

          <div className="flex gap-4 p-2 text-xl">
            {/* send button */}
            {listen ? (
              <button
                onClick={() => {
                  setSpeechInput("");
                  resetTranscript();
                }}
              >
                <FaUndo />
              </button>
            ) : (
              <button onClick={handleSendButton}>
                <IoIosSend />
              </button>
            )}

            {/* microphone */}
            {listen ? (
              <button onClick={handleStopListening} title="Listening">
                <FaMicrophone />
              </button>
            ) : (
              <button onClick={handleListening} title="start recording">
                <PiMicrophoneLight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssist;
