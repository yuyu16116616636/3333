// Web Audio API Synthesizer for sound effects

class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSelect() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignore audio errors
    }
  }

  playBattleStart() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [293.66, 440, 587.33, 880]; // D4, A4, D5, A5
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.2);
      });
    } catch {
      // Ignore
    }
  }

  playVictory() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Fanfare sequence: G4 -> C5 -> E5 -> G5 -> C6 (triumphant)
      const melody = [
        { f: 392.00, t: 0, d: 0.15 },
        { f: 392.00, t: 0.15, d: 0.15 },
        { f: 392.00, t: 0.30, d: 0.15 },
        { f: 523.25, t: 0.45, d: 0.40 }, // C5
        { f: 659.25, t: 0.85, d: 0.25 }, // E5
        { f: 783.99, t: 1.10, d: 0.50 }, // G5
        { f: 1046.50, t: 1.60, d: 0.90 } // C6
      ];

      melody.forEach(n => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, this.ctx.currentTime + n.t);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + n.t);
        osc.stop(this.ctx.currentTime + n.t + n.d);
      });
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundManager();
