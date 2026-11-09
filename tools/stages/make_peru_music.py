#!/usr/bin/env python3
"""Synthesise the Machu Picchu score (original, procedural Andean huayno) and encode it as MP3.

Usage: python3 -I tools/stages/make_peru_music.py OUT.mp3
A minor pentatonic, 104 BPM, 32 bars (~74 s), loops seamlessly (tails wrap around the end).
Breathy quena / pan-flute lead, strummed charango, soft bombo drum and a low harp-like bass. No samples, nothing third-party.
"""
import subprocess, sys, tempfile, os
import numpy as np
from scipy.signal import fftconvolve, butter, lfilter
from scipy.io import wavfile

SR = 44100
BPM = 104
BEAT = 60.0 / BPM
BARS = 32
N = int(BARS * 4 * BEAT * SR)
rng = np.random.default_rng(14)
mix_l = np.zeros(N); mix_r = np.zeros(N)

def add(start, sig, pan=0.0, gain=1.0):
    i = int(start * SR); idx = (np.arange(len(sig)) + i) % N
    np.add.at(mix_l, idx, sig * gain * (1 - max(0, pan)))
    np.add.at(mix_r, idx, sig * gain * (1 + min(0, pan)))

def midi(m): return 440.0 * 2 ** ((m - 69) / 12)

def pluck(f, dur=1.0, bright=1.0):
    """Additive plucked string (charango / harp): harmonics decay faster the higher they are."""
    t = np.arange(int(dur * SR)) / SR
    s = np.zeros_like(t)
    for h in range(1, 9):
        s += np.sin(2 * np.pi * f * h * t + rng.uniform(0, 6.28)) * np.exp(-t * (4 + 7 * h * (1.1 - 0.5 * bright))) / h ** 1.1
    return s * np.minimum(1, t / 0.003) * 0.26

def bass(f, dur):
    t = np.arange(int(dur * SR)) / SR
    s = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)
    return s * np.exp(-t * 2.4) * np.minimum(1, t / 0.01) * 0.5

def quena(f, dur, breath=0.09):
    n = int(dur * SR); t = np.arange(n) / SR
    vib = 1 + 0.006 * np.sin(2 * np.pi * 5.4 * t) * np.minimum(1, t / 0.35)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    s = np.sin(ph) + 0.18 * np.sin(2 * ph) + 0.05 * np.sin(3 * ph)
    b, a = butter(2, [1500 / (SR / 2), 5500 / (SR / 2)], btype="band")
    s += breath * lfilter(b, a, rng.standard_normal(n)) * (1 + 2 * np.exp(-t * 14))      # chiff at the attack
    return s * np.minimum(1, t / 0.05) * np.minimum(1, (dur - t) / 0.1) * 0.27

def bombo(acc=1.0):
    t = np.arange(int(0.45 * SR)) / SR
    f = 70 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) * 0.6 * acc

def tap(acc=1.0):
    t = np.arange(int(0.07 * SR)) / SR
    b, a = butter(2, 3500 / (SR / 2), btype="high")
    return lfilter(b, a, rng.standard_normal(len(t))) * np.exp(-t * 60) * 0.12 * acc

bar = 4 * BEAT; eighth = BEAT / 2
# chord = (bass root, charango voicing)
CH = {
    "Am": (45, [69, 72, 76, 81]),
    "G":  (43, [67, 71, 74, 79]),
    "F":  (41, [65, 69, 72, 77]),
    "E":  (40, [68, 71, 76, 80]),
    "C":  (48, [67, 72, 76, 79]),
    "Dm": (50, [69, 74, 77, 81]),
}
A = ["Am", "Am", "G", "Am", "F", "G", "E", "Am"]
Bs = ["C", "C", "G", "Am", "Dm", "F", "E", "E"]
prog = A + A + Bs + A  # 32 bars

# huayno gallop: long-short-short on every beat pair, strummed down-up
STRUM = [0, 1.5, 2, 3, 3.5]
for b, name in enumerate(prog):
    root, voice = CH[name]
    t0 = b * bar
    add(t0, bass(midi(root), BEAT * 1.6), 0.0, 1.0)
    add(t0 + 2 * BEAT, bass(midi(root + 7 if name != "E" else root), BEAT * 1.4), 0.0, 0.8)
    add(t0, bombo(1.0), 0.0, 0.9)
    add(t0 + 2 * BEAT, bombo(0.7), 0.0, 0.8)
    if b >= 2:
        for k in STRUM:
            for j, m in enumerate(voice):
                add(t0 + k * BEAT + j * 0.011, pluck(midi(m), 0.7, 1.0), -0.25, 0.5 if k in (0, 2) else 0.38)
        for k in range(8):
            add(t0 + k * eighth, tap(1.0 if k % 2 == 0 else 0.5), 0.3, 1.0)

# quena melody, A minor pentatonic (A C D E G), one phrase per 2 bars from bar 4
A4 = 69
def deg(i): return midi(A4 + [0, 3, 5, 7, 10, 12, 15, 17, 19][i % 9])
phr = {
    4:  [(3, 1), (4, 1), (3, 1), (2, 1), (1, 2), (0, 2)],
    6:  [(0, 1), (1, 1), (2, 2), (3, 1.5), (2, .5), (1, 2)],
    8:  [(2, 1), (3, 1), (5, 2), (4, 1), (3, 1), (2, 2)],
    10: [(3, 1.5), (2, .5), (1, 1), (2, 1), (0, 4)],
    12: [(5, 1), (4, 1), (3, 2), (2, 1), (3, 1), (4, 2)],
    14: [(5, 1), (6, 1), (5, 1), (3, 1), (4, 4)],
    16: [(6, 1.5), (5, .5), (4, 1), (3, 1), (2, 2), (3, 2)],
    18: [(4, 1), (3, 1), (2, 2), (1, 1.5), (2, .5), (0, 2)],
    20: [(1, 1), (2, 1), (3, 2), (5, 1), (4, 1), (3, 2)],
    22: [(2, 1.5), (1, .5), (0, 1), (1, 1), (0, 4)],
    24: [(3, 1), (4, 1), (5, 2), (4, 1.5), (3, .5), (2, 2)],
    26: [(2, 1), (3, 1), (4, 2), (3, 1), (2, 1), (1, 2)],
    28: [(1, 1.5), (2, .5), (3, 1), (2, 1), (0, 4)],
}
for b0, notes in phr.items():
    t0 = b0 * bar
    for d, beats in notes:
        dur = beats * BEAT
        add(t0, quena(deg(d), dur * 0.97 + 0.08), 0.3, 1.0)
        # a soft octave-below echo, a pan-flute feel
        add(t0 + 0.02, quena(deg(d) / 2, dur * 0.97 + 0.08, 0.05), -0.3, 0.35)
        t0 += dur

# mountain-air reverb (wrap-safe), longer than Brazil's
ir_len = int(1.9 * SR)
ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / SR * 2.6)
def reverb(x):
    ext = np.concatenate([x, x, x]); return fftconvolve(ext, ir)[: len(ext)][len(x): 2 * len(x)]
out_l = mix_l + 0.09 * reverb(mix_l); out_r = mix_r + 0.09 * reverb(mix_r)
peak = max(np.abs(out_l).max(), np.abs(out_r).max())
stereo = np.stack([out_l, out_r], axis=1) / peak * 0.6

out = sys.argv[1]
with tempfile.TemporaryDirectory() as d:
    wav = os.path.join(d, "peru.wav"); wavfile.write(wav, SR, (stereo * 32767).astype(np.int16))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "64k", out], check=True)
print("wrote", out, os.path.getsize(out), "bytes,", round(N / SR, 1), "s")
