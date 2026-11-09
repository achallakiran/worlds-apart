#!/usr/bin/env python3
"""Synthesise the Brazil score (original, procedural bossa nova) and encode it as MP3.

Usage: python3 -I tools/stages/make_brazil_music.py OUT.mp3
D minor / F major colours, 116 BPM, 32 bars (~66 s), loops seamlessly (tails wrap around the end).
Plucked nylon-style guitar, upright-style bass, shaker, rim click, soft flute. No samples, nothing third-party.
"""
import subprocess, sys, tempfile, os
import numpy as np
from scipy.signal import fftconvolve, butter, lfilter
from scipy.io import wavfile

SR = 44100
BPM = 116
BEAT = 60.0 / BPM
BARS = 32
N = int(BARS * 4 * BEAT * SR)
rng = np.random.default_rng(11)
mix_l = np.zeros(N); mix_r = np.zeros(N)

def add(start, sig, pan=0.0, gain=1.0):
    i = int(start * SR); idx = (np.arange(len(sig)) + i) % N
    np.add.at(mix_l, idx, sig * gain * (1 - max(0, pan)))
    np.add.at(mix_r, idx, sig * gain * (1 + min(0, pan)))

def midi(m): return 440.0 * 2 ** ((m - 69) / 12)

def ks(f, dur=1.4, damp=0.996):
    """Karplus-Strong plucked string."""
    n = int(dur * SR); p = int(SR / f)
    buf = rng.uniform(-1, 1, p) * np.hanning(p) ** 0.3
    out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = damp * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out * 0.35

def bass(f, dur):
    t = np.arange(int(dur * SR)) / SR
    s = np.sin(2 * np.pi * f * t) + 0.4 * np.sin(4 * np.pi * f * t) + 0.15 * np.sin(6 * np.pi * f * t)
    return s * np.exp(-t * 3.2) * np.minimum(1, t / 0.01) * 0.5

def flute(f, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    vib = 1 + 0.005 * np.sin(2 * np.pi * 5.1 * t) * np.minimum(1, t / 0.3)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    s = np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.06 * np.sin(3 * ph)
    b, a = butter(2, [2000 / (SR / 2), 6000 / (SR / 2)], btype="band")
    s += 0.05 * lfilter(b, a, rng.standard_normal(n))
    return s * np.minimum(1, t / 0.06) * np.minimum(1, (dur - t) / 0.12) * 0.26

def shaker(acc=1.0):
    t = np.arange(int(0.09 * SR)) / SR
    b, a = butter(2, 5500 / (SR / 2), btype="high")
    return lfilter(b, a, rng.standard_normal(len(t))) * np.exp(-t * 50) * 0.16 * acc

def click():
    t = np.arange(int(0.05 * SR)) / SR
    return np.sin(2 * np.pi * 1700 * t) * np.exp(-t * 90) * 0.22

bar = 4 * BEAT; sixteenth = BEAT / 4

# chord = (bass root midi, guitar voicing midi list)
CH = {
    "Dm9":   (38, [53, 57, 60, 64]),
    "G13":   (43, [53, 59, 64, 65]),
    "Cmaj9": (36, [52, 59, 62, 67]),
    "A7b9":  (45, [55, 61, 64, 70]),
    "Fmaj7": (41, [52, 57, 60, 64]),
    "Bm7b5": (47, [57, 60, 62, 65]),
    "E7":    (40, [56, 59, 62, 68]),
    "Am9":   (45, [55, 59, 64, 67]),
    "D7":    (38, [54, 60, 64, 69]),
}
A = ["Dm9", "G13", "Cmaj9", "A7b9", "Dm9", "G13", "Cmaj9", "Cmaj9"]
Bs = ["Fmaj7", "Bm7b5", "E7", "Am9", "Dm9", "D7", "G13", "A7b9"]
prog = A + A + Bs + A  # 32 bars

# bossa guitar pattern on sixteenth positions (bar of 16): chord hits
HITS = [0, 3, 6, 10, 12]
for b, name in enumerate(prog):
    root, voice = CH[name]
    t0 = b * bar
    sparse = b < 2
    # bass: root on 1, fifth on 3 (anticipated), bossa thumb
    add(t0, bass(midi(root), BEAT * 1.4), 0.0, 1.0)
    add(t0 + 2 * BEAT, bass(midi(root + 7), BEAT * 1.2), 0.0, 0.85)
    if not sparse or b == 1:
        for k in HITS:
            for j, m in enumerate(voice):
                add(t0 + k * sixteenth + j * 0.012, ks(midi(m), 0.9), -0.2, 0.55)
    # shaker on straight sixteenths from bar 2
    if b >= 2:
        for k in range(16):
            add(t0 + k * sixteenth, shaker(1.0 if k % 4 == 0 else 0.55), 0.25, 1.0)
        for k in (0, 3, 6, 10, 13):
            add(t0 + k * sixteenth, click(), 0.35, 0.8)

# flute melody (D dorian / F major colours) in bars 4..28, one phrase per 2 bars
D4 = 62
def deg(i): return midi(D4 + [0, 2, 3, 5, 7, 9, 10, 12, 14, 15][i % 10])
phr = {
    4:  [(4, 1.5), (5, .5), (4, 1), (2, 1), (3, 2), (1, 2)],
    6:  [(2, 1), (3, 1), (4, 2), (5, 1.5), (4, .5), (3, 2)],
    8:  [(4, 1), (6, 1), (7, 2), (6, 1.5), (5, .5), (4, 2)],
    10: [(5, 1), (4, 1), (3, 1), (2, 1), (1, 2), (0, 2)],
    12: [(0, 1), (2, 1), (4, 2), (3, 1.5), (2, .5), (4, 2)],
    14: [(5, 1.5), (6, .5), (7, 1), (6, 1), (4, 4)],
    16: [(7, 1), (6, 1), (5, 2), (4, 1.5), (5, .5), (3, 2)],
    18: [(2, 1), (4, 1), (5, 2), (7, 1.5), (6, .5), (5, 2)],
    20: [(4, 1), (3, 1), (2, 2), (3, 1), (4, 1), (2, 2)],
    22: [(3, 1.5), (4, .5), (5, 1), (4, 1), (2, 4)],
    24: [(4, 1), (5, 1), (7, 2), (6, 1.5), (5, .5), (4, 2)],
    26: [(5, 1), (4, 1), (3, 2), (2, 2), (0, 2)],
}
for b0, notes in phr.items():
    t0 = b0 * bar
    for d, beats in notes:
        dur = beats * BEAT
        add(t0, flute(deg(d), dur * 0.96 + 0.06), 0.3, 1.0)
        t0 += dur

# soft room reverb (wrap-safe)
ir_len = int(1.3 * SR)
ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / SR * 3.6)
def reverb(x):
    ext = np.concatenate([x, x, x]); return fftconvolve(ext, ir)[: len(ext)][len(x): 2 * len(x)]
out_l = mix_l + 0.06 * reverb(mix_l); out_r = mix_r + 0.06 * reverb(mix_r)
peak = max(np.abs(out_l).max(), np.abs(out_r).max())
stereo = np.stack([out_l, out_r], axis=1) / peak * 0.6

out = sys.argv[1]
with tempfile.TemporaryDirectory() as d:
    wav = os.path.join(d, "brazil.wav"); wavfile.write(wav, SR, (stereo * 32767).astype(np.int16))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "64k", out], check=True)
print("wrote", out, os.path.getsize(out), "bytes,", round(N / SR, 1), "s")
