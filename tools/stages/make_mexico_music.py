#!/usr/bin/env python3
"""Synthesise the Chichen Itza score (original, procedural son-style) and encode it as MP3.

Usage: python3 -I tools/stages/make_mexico_music.py OUT.mp3
A harmonic minor, 6/8 at 104 BPM (dotted quarter), 48 bars (~55 s), loops seamlessly.
Trumpet duet in thirds, guitarron bass, vihuela strum, maracas and a rim-click. No samples, nothing third-party.
"""
import subprocess, sys, tempfile, os
import numpy as np
from scipy.signal import fftconvolve, butter, lfilter
from scipy.io import wavfile

SR = 44100
BPM = 104
DQ = 60.0 / BPM                 # dotted quarter = one beat, two beats per bar (6/8)
EIGHTH = DQ / 3
BAR = 2 * DQ
BARS = 48
N = int(BARS * BAR * SR)
rng = np.random.default_rng(23)

AHM = [0, 2, 3, 5, 7, 8, 11]    # A harmonic minor
def hz(deg, octave=0):
    o, d = divmod(deg, 7)
    return 220.0 * 2 ** ((AHM[d] + 12 * (o + octave)) / 12)

mix_l = np.zeros(N); mix_r = np.zeros(N)
def add(start, sig, pan=0.0, gain=1.0):
    idx = (np.arange(len(sig)) + int(start * SR)) % N
    np.add.at(mix_l, idx, sig * gain * (1 - max(0, pan)))
    np.add.at(mix_r, idx, sig * gain * (1 + min(0, pan)))

def trumpet(f, dur, vib=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    v = 1 + 0.004 * vib * np.sin(2 * np.pi * 5.5 * t) * np.minimum(1, t / 0.3)
    ph = 2 * np.pi * np.cumsum(f * v) / SR
    sig = sum(np.sin(k * ph) / k ** 0.8 for k in range(1, 9))
    b, a = butter(2, 3200 / (SR / 2), btype="low")
    sig = lfilter(b, a, sig)
    env = np.minimum(1, t / 0.03) * np.minimum(1, (dur - t) / 0.1) * (0.85 + 0.15 * np.exp(-t * 8))
    return sig * env * 0.16

def guitarron(f, dur=0.6):
    t = np.arange(int(dur * SR)) / SR
    sig = sum(np.sin(2 * np.pi * f * k * t) * np.exp(-(3 + k * 2) * t) / k for k in range(1, 6))
    return sig * (1 - np.exp(-t * 600)) * 0.55

def vihuela(freqs, dur=0.35, up=False):
    out = np.zeros(int(dur * SR))
    t = np.arange(len(out)) / SR
    for i, f in enumerate(freqs[::-1] if up else freqs):
        d = int(i * 0.008 * SR)
        s = sum(np.sin(2 * np.pi * f * k * t) * np.exp(-(8 + 3 * k) * t) / k for k in range(1, 5)) * (1 - np.exp(-t * 900))
        out[d:] += s[: len(out) - d] * 0.14
    return out

def maraca():
    t = np.arange(int(0.09 * SR)) / SR
    b, a = butter(2, 4500 / (SR / 2), btype="high")
    return lfilter(b, a, rng.standard_normal(len(t))) * np.exp(-t * 45) * 0.12

def click():
    t = np.arange(int(0.06 * SR)) / SR
    return np.sin(2 * np.pi * 900 * t) * np.exp(-t * 90) * 0.18

# progression (degrees of AHM): Am G F E  |  Am Dm E Am   (two bars each chord pair)
prog = [(0, [0, 2, 4]), (6, [6, 1, 3]), (5, [5, 0, 2]), (4, [4, 6, 8]),
        (0, [0, 2, 4]), (3, [3, 5, 7]), (4, [4, 6, 8]), (0, [0, 2, 4])]
for b in range(BARS):
    root, ch = prog[(b // 2) % 8]
    # guitarron: root on beat 1, fifth on beat 2
    add(b * BAR, guitarron(hz(root, -2)), 0, 1.0)
    add(b * BAR + DQ, guitarron(hz(root + 4, -2)), 0, 0.8)
    # vihuela: down-up on the six eighths (accent 1 and 4)
    for i in range(6):
        if b < 1 and i % 3: continue
        add(b * BAR + i * EIGHTH, vihuela([hz(d, 0) for d in ch], 0.3, up=i % 2 == 1), 0.2, 1.0 if i % 3 == 0 else 0.6)
        add(b * BAR + i * EIGHTH, maraca(), -0.2, 0.9 if i % 3 else 0.6)
    add(b * BAR + 2 * EIGHTH, click(), 0.1, 0.6); add(b * BAR + 5 * EIGHTH, click(), 0.1, 0.6)

# trumpet duet: (degree, eighths); two-bar phrases from bar 4
phr = [
    [(7, 3), (8, 1), (7, 1), (6, 1), (5, 3), (4, 1), (3, 2)],
    [(4, 2), (5, 1), (6, 3), (7, 3), (8, 3)],
    [(9, 3), (8, 1), (7, 2), (6, 3), (5, 3)],
    [(4, 1), (5, 1), (6, 1), (7, 3), (6, 3), (4, 3)],
]
for pi in range(2, BARS // 2 - 1):
    notes = phr[pi % 4]
    t0 = pi * 2 * BAR
    for deg, e in notes:
        dur = e * EIGHTH
        add(t0, trumpet(hz(deg, 0), dur * 0.95 + 0.05), 0.25, 1.0)
        if pi >= 6: add(t0, trumpet(hz(deg - 2, 0), dur * 0.95 + 0.05, 0.7), -0.25, 0.7)
        t0 += dur

ir = rng.standard_normal(int(1.6 * SR)) * np.exp(-np.arange(int(1.6 * SR)) / SR * 3.0)
def reverb(x):
    ext = np.concatenate([x, x, x]); return fftconvolve(ext, ir)[: len(ext)][len(x): 2 * len(x)]
out_l = mix_l + 0.08 * reverb(mix_l); out_r = mix_r + 0.08 * reverb(mix_r)
peak = max(np.abs(out_l).max(), np.abs(out_r).max())
stereo = np.stack([out_l, out_r], axis=1) / peak * 0.6
out = sys.argv[1]
with tempfile.TemporaryDirectory() as d:
    wav = os.path.join(d, "mx.wav")
    wavfile.write(wav, SR, (stereo * 32767).astype(np.int16))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "64k", out], check=True)
print("wrote", out, os.path.getsize(out), "bytes,", round(N / SR, 1), "s")
