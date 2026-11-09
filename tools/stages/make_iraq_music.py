#!/usr/bin/env python3
"""Synthesise the Hanging Gardens of Babylon score (original, procedural, Mesopotamian maqam feel) and encode it as MP3.

Usage: python3 -I tools/stages/make_iraq_music.py OUT.mp3
Maqam Hijaz on D, 6/8 at 96 BPM (Iraqi chobi feel), 40 bars (~50 s), loops seamlessly.
Ney-style breathy flute melody, oud pluck ostinato and fills, qanun/santur shimmer, darbuka (dum / tak) and a low drone. No samples.
"""
import subprocess, sys, tempfile, os
import numpy as np
from scipy.signal import fftconvolve, butter, lfilter
from scipy.io import wavfile

SR = 44100
BPM = 96
DQ = 60.0 / BPM
EIGHTH = DQ / 3
BAR = 2 * DQ
BARS = 40
N = int(BARS * BAR * SR)
rng = np.random.default_rng(31)

HIJAZ = [0, 1, 4, 5, 7, 8, 10]    # D Eb F# G A Bb C
def hz(deg, octave=0):
    o, d = divmod(deg, 7)
    return 146.83 * 2 ** ((HIJAZ[d] + 12 * (o + octave)) / 12)

mix_l = np.zeros(N); mix_r = np.zeros(N)
def add(start, sig, pan=0.0, gain=1.0):
    idx = (np.arange(len(sig)) + int(start * SR)) % N
    np.add.at(mix_l, idx, sig * gain * (1 - max(0, pan)))
    np.add.at(mix_r, idx, sig * gain * (1 + min(0, pan)))

def ney(f, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    v = 1 + 0.006 * np.sin(2 * np.pi * 5.2 * t) * np.minimum(1, t / 0.35)
    ph = 2 * np.pi * np.cumsum(f * v) / SR
    tone = np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.12 * np.sin(3 * ph)
    b, a = butter(2, [f * 1.5 / (SR / 2), min(0.45, f * 6 / (SR / 2))], btype="band")
    breath = lfilter(b, a, rng.standard_normal(n)) * 0.5
    env = np.minimum(1, t / 0.07) * np.minimum(1, (dur - t) / 0.12) * (0.88 + 0.12 * np.exp(-t * 6))
    return (tone + breath) * env * 0.17

def oud(f, dur=0.8, hard=1.0):
    t = np.arange(int(dur * SR)) / SR
    sig = sum(np.sin(2 * np.pi * f * k * t * (1 + 0.0004 * k * k)) * np.exp(-(2.5 + k * 1.8) * t) / k ** 0.9 for k in range(1, 8))
    return sig * (1 - np.exp(-t * 900)) * 0.42 * hard

def qanun(f, dur=1.4):
    t = np.arange(int(dur * SR)) / SR
    sig = sum(np.sin(2 * np.pi * f * k * t) * np.exp(-(1.6 + k * 1.4) * t) / k for k in range(1, 6))
    return sig * (1 - np.exp(-t * 1200)) * 0.2

def dum():
    t = np.arange(int(0.28 * SR)) / SR
    f = 150 * np.exp(-t * 9) + 60
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 11) * 0.7

def tak():
    t = np.arange(int(0.07 * SR)) / SR
    b, a = butter(2, 2500 / (SR / 2), btype="high")
    return lfilter(b, a, rng.standard_normal(len(t))) * np.exp(-t * 60) * 0.3

def drone(f, dur):
    t = np.arange(int(dur * SR)) / SR
    return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * 2 * f * t) + 0.2 * np.sin(2 * np.pi * 3 * f * t)) * 0.07

# chords (scale degrees): i  bII  i  iv-ish  |  i  bII  v  i  (two bars each)
prog = [(0, [0, 2, 4]), (1, [1, 3, 5]), (0, [0, 2, 4]), (3, [3, 5, 7]), (0, [0, 2, 4]), (1, [1, 3, 5]), (4, [4, 6, 8]), (0, [0, 2, 4])]
for b in range(BARS):
    root, ch = prog[(b // 2) % 8]
    add(b * BAR, oud(hz(root, -1), 1.0, 1.0), -0.15, 1.0)
    add(b * BAR + DQ, oud(hz(root + 4, -1), 0.8, 0.8), -0.15, 0.8)
    for i, d in enumerate(ch):
        if (b * 7 + i * 3) % 3 != 0: add(b * BAR + (i + 1) * EIGHTH + (0 if b % 2 else DQ), oud(hz(d, 0), 0.5, 0.7), -0.1, 0.55)
    add(b * BAR, dum(), 0.1, 1.0); add(b * BAR + 2 * EIGHTH, tak(), 0.1, 0.8); add(b * BAR + 3 * EIGHTH, dum(), 0.1, 0.7)
    add(b * BAR + 4 * EIGHTH, tak(), 0.1, 0.6); add(b * BAR + 5 * EIGHTH, tak(), 0.1, 0.8)
    for i in range(6):
        if rng.random() < 0.55:
            add(b * BAR + i * EIGHTH, qanun(hz(ch[int(rng.integers(0, 3))] + 7, 0)), 0.3 if i % 2 else -0.3, 0.7 + 0.5 * rng.random())
add(0, drone(hz(0, -2), N / SR), 0, 1.0)

phr = [
    [(7, 3), (6, 1), (5, 2), (4, 3), (3, 3)],
    [(4, 2), (5, 1), (6, 3), (7, 3), (8, 3)],
    [(9, 3), (8, 2), (7, 1), (6, 3), (5, 3)],
    [(7, 2), (6, 1), (5, 1), (4, 2), (2, 2), (1, 1), (0, 3)],
]
for pi in range(2, BARS // 2):
    notes = phr[pi % 4]
    t0 = pi * 2 * BAR
    for deg, e in notes:
        dur = e * EIGHTH
        add(t0, ney(hz(deg, 0), dur * 0.97 + 0.06), 0.15, 1.0)
        if pi >= 8 and pi % 2: add(t0, ney(hz(deg + 2, 0), dur * 0.97 + 0.06), -0.25, 0.45)
        t0 += dur

ir = rng.standard_normal(int(2.2 * SR)) * np.exp(-np.arange(int(2.2 * SR)) / SR * 2.4)
def reverb(x):
    ext = np.concatenate([x, x, x]); return fftconvolve(ext, ir)[: len(ext)][len(x): 2 * len(x)]
out_l = mix_l + 0.12 * reverb(mix_l); out_r = mix_r + 0.12 * reverb(mix_r)
peak = max(np.abs(out_l).max(), np.abs(out_r).max())
stereo = np.stack([out_l, out_r], axis=1) / peak * 0.6
out = sys.argv[1]
with tempfile.TemporaryDirectory() as d:
    wav = os.path.join(d, "iq.wav")
    wavfile.write(wav, SR, (stereo * 32767).astype(np.int16))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "64k", out], check=True)
print("wrote", out, os.path.getsize(out), "bytes,", round(N / SR, 1), "s")
