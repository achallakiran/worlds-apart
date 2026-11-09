#!/usr/bin/env python3
"""Synthesise the Petra score (original, procedural) and encode it as MP3.

Usage: python3 -I tools/stages/make_petra_music.py OUT.mp3
D Hijaz, 84 BPM, 24 bars (~68 s), loops seamlessly (tails wrap around the end).
Oud-like plucks, nay-like flute, drone pad, frame drum. No samples, no third-party material.
"""
import subprocess, sys, tempfile, os
import numpy as np
from scipy.signal import fftconvolve, butter, lfilter
from scipy.io import wavfile

SR = 44100
BPM = 84
BEAT = 60.0 / BPM
BARS = 24
N = int(BARS * 4 * BEAT * SR)
rng = np.random.default_rng(7)

# D Hijaz (D Eb F# G A Bb C D); intervals in semitones from D
HIJAZ = [0, 1, 4, 5, 7, 8, 10, 12]
def hz(deg, octave=0):
    """scale degree (0..7, may go beyond) to frequency, D4 = 293.66 Hz as degree 0."""
    o, d = divmod(deg, 7)
    semis = HIJAZ[d] + 12 * (o + octave)
    return 293.66 * 2 ** (semis / 12)

mix_l = np.zeros(N)
mix_r = np.zeros(N)

def add(buf, start, sig, pan=0.0, gain=1.0):
    """add sig at start (seconds) wrapping around the end for a seamless loop."""
    i = int(start * SR)
    n = len(sig)
    idx = (np.arange(n) + i) % N
    l = gain * (1 - max(0, pan))
    r = gain * (1 + min(0, pan))
    np.add.at(mix_l, idx, sig * l)
    np.add.at(mix_r, idx, sig * r)

def pluck(f, dur=1.6, bright=1.0):
    t = np.arange(int(dur * SR)) / SR
    sig = np.zeros_like(t)
    for k in range(1, 14):
        amp = 1.0 / (k ** (1.1 + 0.1 * (1 - bright)))
        dec = 3.0 + k * 1.6
        sig += amp * np.sin(2 * np.pi * f * k * (1 + 0.0004 * k * k) * t) * np.exp(-dec * t)
    # attack click
    click = rng.standard_normal(len(t)) * np.exp(-t * 400) * 0.08
    sig = (sig + click) * (1 - np.exp(-t * 900))
    return sig * 0.5

def nay(f, dur, vib=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    v = 1 + 0.006 * vib * np.sin(2 * np.pi * 5.3 * t) * np.minimum(1, t / 0.5)
    ph = 2 * np.pi * np.cumsum(f * v) / SR
    sig = np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.12 * np.sin(3 * ph)
    breath = rng.standard_normal(n)
    b, a = butter(2, [1800 / (SR / 2), 5200 / (SR / 2)], btype="band")
    sig += 0.07 * lfilter(b, a, breath)
    env = np.minimum(1, t / 0.12) * np.minimum(1, (dur - t) / 0.25)
    return sig * env * 0.28

def drone(f, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.003 * t) + 0.25 * np.sin(2 * np.pi * f * 3.002 * t)
    lfo = 0.75 + 0.25 * np.sin(2 * np.pi * t / (dur / 3))
    return sig * lfo * 0.11

def dum():
    t = np.arange(int(0.45 * SR)) / SR
    f = 70 + 110 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 0.9

def tek():
    t = np.arange(int(0.12 * SR)) / SR
    n = rng.standard_normal(len(t))
    b, a = butter(2, 2500 / (SR / 2), btype="high")
    return lfilter(b, a, n) * np.exp(-t * 55) * 0.35

def ka():
    return tek() * 0.55

bar = 4 * BEAT
eighth = BEAT / 2

# ---- drone: whole piece (D2 + A2), long notes in 6-bar blocks ----
for b0 in range(0, BARS, 6):
    add(None, b0 * bar, drone(hz(0, -2), 6 * bar + 0.5), 0, 1.0)
    add(None, b0 * bar, drone(hz(4, -2), 6 * bar + 0.5), 0.15, 0.7)

# ---- oud ostinato (all bars), varied by section ----
ostinato_a = [0, 4, 0, 4, 1, 4, 0, 4]       # degrees on eighths
ostinato_b = [0, 4, 3, 4, 2, 4, 1, 0]
for b in range(BARS):
    pat = ostinato_b if (b % 8) in (3, 7) else ostinato_a
    for i, d in enumerate(pat):
        if b < 2 and i % 2:  # sparse intro
            continue
        add(None, b * bar + i * eighth, pluck(hz(d, -1), 1.4), -0.2, 0.9)
    if b % 4 == 0:  # bass note
        add(None, b * bar, pluck(hz(0, -2), 2.4, 0.6), 0.0, 1.1)

# ---- melody (nay): phrases in bars 4-20, rests elsewhere ----
phrases = {
    4:  [(4, 2), (5, 1), (4, 1), (2, 2), (1, 2)],
    6:  [(1, 1), (2, 1), (4, 2), (5, 2), (7, 2)],
    8:  [(7, 2), (6, 1), (5, 1), (4, 2), (2, 2)],
    10: [(4, 1), (5, 1), (6, 1), (5, 1), (4, 2), (1, 2)],
    12: [(8, 2), (7, 1), (6, 1), (5, 2), (4, 2)],
    14: [(4, 1.5), (5, 0.5), (6, 1), (7, 1), (8, 3)],
    16: [(8, 2), (6, 1), (5, 1), (4, 2), (2, 2)],
    18: [(2, 1), (1, 1), (0, 2), (1, 2), (0, 2)],
}
for b0, notes in phrases.items():
    t0 = b0 * bar
    for deg, beats in notes:
        dur = beats * BEAT
        add(None, t0, nay(hz(deg, 0), dur * 0.97 + 0.08), 0.25, 1.0)
        t0 += dur

# ---- frame drum (maqsum) from bar 2 to bar 22 ----
pattern = [("d", 0), ("t", 1), ("t", 3), ("d", 4), ("t", 6)]  # eighth positions
for b in range(2, 22):
    for kind, pos in pattern:
        tt = b * bar + pos * eighth
        add(None, tt, {"d": dum, "t": tek}[kind](), 0.0, 0.85 if b < 4 else 1.0)
    add(None, b * bar + 7 * eighth, ka(), 0.1, 0.8)

# ---- gentle reverb (wrap-safe: convolve the loop 3x and take the middle) ----
ir_len = int(1.6 * SR)
ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / SR * 3.2)
def reverb(x):
    ext = np.concatenate([x, x, x])
    wet = fftconvolve(ext, ir)[: len(ext)]
    return wet[len(x): 2 * len(x)]
wl, wr = reverb(mix_l), reverb(mix_r)
out_l = mix_l + 0.07 * wl
out_r = mix_r + 0.07 * wr
peak = max(np.abs(out_l).max(), np.abs(out_r).max())
stereo = np.stack([out_l, out_r], axis=1) / peak * 0.6

out = sys.argv[1]
with tempfile.TemporaryDirectory() as d:
    wav = os.path.join(d, "petra.wav")
    wavfile.write(wav, SR, (stereo * 32767).astype(np.int16))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "64k", out], check=True)
print("wrote", out, os.path.getsize(out), "bytes,", round(N / SR, 1), "s")
