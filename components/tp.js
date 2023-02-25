  // const transcribeAudio = async (audioUrl) => {
  //   const audioUri = audioUrl; // set the audio URL directly
  //   const audioConfig = {
  //     encoding: 'LINEAR16', // the audio file format, e.g. LINEAR16 for WAV files
  //     sampleRateHertz: 44100, // the audio file's sample rate
  //     languageCode: 'en-US', // the language of the audio file
  //   };
  //   const request = {
  //     audio: { uri: audioUri },
  //     config: audioConfig,
  //   };
  //   const [response] = await client.recognize(request); // send the transcription request to the API
  //   const transcription = response.results
  //     .map((result) => result.alternatives[0].transcript)
  //     .join('\n');
  //   setText(transcription);
  // };