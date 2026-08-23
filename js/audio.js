/* =========================================================
   Algeria Pulse — Audio Engine (Howler.js)
   Howler.js only *plays* audio — it doesn't synthesize tones — so each
   cue is generated once as a short PCM waveform, packaged into a WAV
   data URI, and handed to a Howl instance. Howler then owns playback:
   it decodes once, handles the mobile "unlock on first gesture" dance,
   and replays instantly on every subsequent call (the point of using it
   here over raw oscillators is exactly that low-latency, reliable
   replay). If the Howler CDN fails to load, every play*Beep() export
   below is a silent no-op — the app keeps working without sound.
   ========================================================= */

let soundsReady = false;
let mapBeepSound = null;
let lockedBeepSound = null;
let copyBeepSound = null;
let saveBeepSound = null;

// Renders a set of tone segments into 16-bit PCM samples and returns a
// `data:audio/wav;base64,...` URI. Each segment: { freq, freqEnd?, start,
// duration, type: 'sine'|'square'|'triangle', peak }.
function synthWavDataURI(segments, sampleRate = 44100) {
  const totalDuration = Math.max(...segments.map((s) => s.start + s.duration));
  const totalSamples = Math.ceil(totalDuration * sampleRate) + 1;
  const data = new Float32Array(totalSamples);

  segments.forEach((seg) => {
    const { freq, freqEnd, start, duration, type = "sine", peak = 0.5 } = seg;
    const startSample = Math.floor(start * sampleRate);
    const segSamples = Math.floor(duration * sampleRate);
    for (let i = 0; i < segSamples; i++) {
      const t = i / sampleRate;
      const progress = duration > 0 ? t / duration : 0;
      const f = freqEnd ? freq + (freqEnd - freq) * progress : freq;
      const phase = 2 * Math.PI * f * t;

      let sample;
      if (type === "square") sample = Math.sign(Math.sin(phase)) || 0;
      else if (type === "triangle") sample = (2 / Math.PI) * Math.asin(Math.sin(phase));
      else sample = Math.sin(phase);

      // Fast attack, gentle release envelope so tones click on cleanly
      // and fade out without popping.
      const attack = Math.min(1, t / 0.008);
      const release = Math.min(1, (duration - t) / 0.05);
      const envelope = Math.max(0, Math.min(attack, release));

      const idx = startSample + i;
      if (idx < data.length) data[idx] += sample * peak * envelope;
    }
  });

  let peakAmp = 0;
  for (let i = 0; i < data.length; i++) peakAmp = Math.max(peakAmp, Math.abs(data[i]));
  const norm = peakAmp > 1 ? 1 / peakAmp : 1;

  const pcm = new Int16Array(data.length);
  for (let i = 0; i < data.length; i++) {
    pcm[i] = Math.max(-1, Math.min(1, data[i] * norm)) * 32767;
  }

  return pcmToWavDataURI(pcm, sampleRate);
}

function pcmToWavDataURI(pcm, sampleRate) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcm.length * 2;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < pcm.length; i++) {
    view.setInt16(offset, pcm[i], true);
    offset += 2;
  }

  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return "data:audio/wav;base64," + btoa(binary);
}

function initSounds() {
  if (soundsReady || typeof Howl === "undefined") return;
  try {
    // Ascending "radar" chirp — map click or dropdown selection.
    mapBeepSound = new Howl({
      src: [synthWavDataURI([{ freq: 880, freqEnd: 1320, start: 0, duration: 0.16, type: "sine", peak: 0.5 }])],
      format: ["wav"],
      volume: 0.5
    });

    // Low, descending double-blip — locked/denied interaction attempt.
    lockedBeepSound = new Howl({
      src: [
        synthWavDataURI([
          { freq: 240, freqEnd: 160, start: 0, duration: 0.1, type: "square", peak: 0.32 },
          { freq: 240, freqEnd: 160, start: 0.11, duration: 0.1, type: "square", peak: 0.32 }
        ])
      ],
      format: ["wav"],
      volume: 0.5
    });

    // Two-note success chime — copy link / copy snippet / share.
    copyBeepSound = new Howl({
      src: [
        synthWavDataURI([
          { freq: 659.25, start: 0, duration: 0.13, type: "sine", peak: 0.42 },
          { freq: 987.77, start: 0.09, duration: 0.13, type: "sine", peak: 0.42 }
        ])
      ],
      format: ["wav"],
      volume: 0.55
    });

    // Single soft, higher blip — new local-feed entry saved.
    saveBeepSound = new Howl({
      src: [synthWavDataURI([{ freq: 1108.73, start: 0, duration: 0.11, type: "triangle", peak: 0.32 }])],
      format: ["wav"],
      volume: 0.5
    });

    soundsReady = true;
  } catch (e) {
    soundsReady = false;
  }
}

// Ascending "radar" chirp — map click or dropdown selection.
export function playMapBeep() {
  initSounds();
  if (mapBeepSound) mapBeepSound.play();
}

// A distinct, lower "denied" double-blip — played when the user tries to
// interact with the map or dropdown while viewing a locked shared pulse.
export function playLockedBeep() {
  initSounds();
  if (lockedBeepSound) lockedBeepSound.play();
}

// A short, pleasant two-note "success" chime — played after a successful
// copy (link or snippet) or share.
export function playCopyBeep() {
  initSounds();
  if (copyBeepSound) copyBeepSound.play();
}

// A single soft, higher blip — played when a new entry is first written
// to the local feed (not on every subsequent draft update).
export function playSaveBeep() {
  initSounds();
  if (saveBeepSound) saveBeepSound.play();
}
