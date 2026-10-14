'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 1000;
const PLAYER_SPEED = 25;
const BULLET_SPEED = 15;
const ENEMY_SPEED_BASE = 1;
const WIN_SCORE = 1000;

// Types
type Player = { x: number; y: number; width: number; height: number };
type Bullet = { x: number; y: number; radius: number; color: string; active: boolean };
type Enemy = { x: number; y: number; width: number; height: number; type: string; emoji: string; active: boolean; speed: number; hp: number };
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string; life: number; maxLife: number; active: boolean };
type FloatingText = { x: number; y: number; text: string; color: string; life: number; maxLife: number; active: boolean };

const ENEMY_TYPES = [
  { name: '충치균', emoji: '🦠', color: '#ef4444', hp: 1 },
  { name: '치주염', emoji: '🩸', color: '#dc2626', hp: 2 },
  { name: '사랑니', emoji: '🦷', color: '#f59e0b', hp: 3 },
  { name: '충치', emoji: '🕳️', color: '#991b1b', hp: 1 },
  { name: '부정교합', emoji: '〰️', color: '#8b5cf6', hp: 2 },
  { name: '치아변색', emoji: '🟤', color: '#a16207', hp: 1 },
  { name: '불편틀니', emoji: '😬', color: '#6b7280', hp: 3 },
  { name: '이갈이', emoji: '⚡', color: '#eab308', hp: 2 },
  { name: '덧니', emoji: '🧛', color: '#10b981', hp: 2 },
  { name: '돌출입', emoji: '👄', color: '#ec4899', hp: 2 },
];

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER' | 'WIN'>('START');
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Use refs for game state to avoid re-renders during animation loop
  const playerRef = useRef<Player>({ x: CANVAS_WIDTH / 2 - 40, y: CANVAS_HEIGHT - 100, width: 80, height: 80 });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const lastShootTimeRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);
  const reqIdRef = useRef<number>(0);
  const isMouseDownRef = useRef<boolean>(false);
  const targetXRef = useRef<number>(CANVAS_WIDTH / 2);

  // Play a simple sound effect using Web Audio API
  const playSound = (type: 'shoot' | 'explosion' | 'win' | 'hit') => {
    if (!audioCtxRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      } catch (e) {
        return;
      }
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'shoot') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'explosion') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'hit') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.4);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.6);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1.5);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    }
  };

  const createParticles = (x: number, y: number, color: string, amount: number) => {
    for (let i = 0; i < amount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        color,
        life: 0,
        maxLife: Math.random() * 20 + 20,
        active: true
      });
    }
  };

  const startGame = () => {
    playerRef.current = { x: CANVAS_WIDTH / 2 - 40, y: CANVAS_HEIGHT - 100, width: 80, height: 80 };
    bulletsRef.current = [];
    enemiesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    setGameState('PLAYING');
  };

  useEffect(() => {
    // Detect Mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto start on mobile if in START state
    if (window.innerWidth <= 768 && gameState === 'START') {
      // Small delay to ensure component is fully mounted
      setTimeout(() => startGame(), 500);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Input
    const handleKeyDown = (e: KeyboardEvent) => { keysRef.current[e.key] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keysRef.current[e.key] = false; };
    
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = (e as MouseEvent).clientX;
      }
      const scaleX = canvas.width / rect.width;
      targetXRef.current = (clientX - rect.left) * scaleX;
    };
    
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isMouseDownRef.current = true;
      handlePointerMove(e);
      // Initialize audio context on first user interaction
      if (!audioCtxRef.current) {
        playSound('shoot'); 
      }
    };
    const handlePointerUp = () => { isMouseDownRef.current = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('touchstart', handlePointerDown, { passive: false });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: false });
    canvas.addEventListener('touchend', handlePointerUp);

    let lastTime = 0;

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      if (gameState === 'PLAYING') {
        update(timestamp);
      }
      
      draw(ctx);
      reqIdRef.current = requestAnimationFrame(gameLoop);
    };

    reqIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchend', handlePointerUp);
      cancelAnimationFrame(reqIdRef.current);
    };
  }, [gameState]);

  const update = (timestamp: number) => {
    // Player Movement
    const player = playerRef.current;
    
    // Keyboard movement
    if (keysRef.current['ArrowLeft'] || keysRef.current['a']) player.x -= PLAYER_SPEED;
    if (keysRef.current['ArrowRight'] || keysRef.current['d']) player.x += PLAYER_SPEED;
    
    // Mouse/Touch movement (follow target)
    if (isMouseDownRef.current || isMobile) {
      const targetCenter = targetXRef.current - player.width / 2;
      const diff = targetCenter - player.x;
      if (Math.abs(diff) > PLAYER_SPEED) {
        player.x += Math.sign(diff) * PLAYER_SPEED;
      } else {
        player.x = targetCenter;
      }
    }

    // Boundaries
    player.x = Math.max(0, Math.min(CANVAS_WIDTH - player.width, player.x));

    // Auto Shooting
    if (timestamp - lastShootTimeRef.current > 100) {
      if (isMouseDownRef.current || isMobile || keysRef.current[' ']) {
        bulletsRef.current.push({
          x: player.x + player.width / 2,
          y: player.y,
          radius: 6,
          color: '#3b82f6',
          active: true
        });
        playSound('shoot');
        lastShootTimeRef.current = timestamp;
      }
    }

    // Update Bullets
    bulletsRef.current.forEach(b => {
      b.y -= BULLET_SPEED;
      if (b.y < 0) b.active = false;
    });
    bulletsRef.current = bulletsRef.current.filter(b => b.active);

    // Spawn Enemies
    if (Math.random() < 0.015 + (scoreRef.current / 20000)) {
      const type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
      enemiesRef.current.push({
        x: Math.random() * (CANVAS_WIDTH - 60),
        y: -60,
        width: 60,
        height: 60,
        type: type.name,
        emoji: type.emoji,
        color: type.color,
        hp: Math.max(1, type.hp - 1) + Math.floor(scoreRef.current / 400),
        speed: ENEMY_SPEED_BASE + Math.random() * 1.5 + (scoreRef.current / 400),
        active: true
      });
    }

    // Update Enemies & Collisions
    enemiesRef.current.forEach(e => {
      e.y += e.speed;
      
      // Game Over if enemy reaches bottom
      if (e.y > CANVAS_HEIGHT) {
        setGameState('GAME_OVER');
      }

      // Check bullet collisions
      bulletsRef.current.forEach(b => {
        if (!b.active) return;
        
        // Simple circle-rect collision
        const distX = Math.abs(b.x - e.x - e.width / 2);
        const distY = Math.abs(b.y - e.y - e.height / 2);

        if (distX <= (e.width / 2 + b.radius) && distY <= (e.height / 2 + b.radius)) {
          b.active = false;
          e.hp--;
          
          if (e.hp <= 0) {
            e.active = false;
            createParticles(e.x + e.width/2, e.y + e.height/2, (e as any).color, 15);
            scoreRef.current += 10;
            setScore(scoreRef.current);
            playSound('explosion');
            
            // Add Floating Text
            const praises = ['GREAT!', 'NICE!', 'PERFECT!', 'WOW!'];
            const randomPraise = praises[Math.floor(Math.random() * praises.length)];
            floatingTextsRef.current.push({
              x: e.x + e.width/2,
              y: e.y,
              text: scoreRef.current % 50 === 0 ? 'COMBO!' : randomPraise,
              color: '#fbbf24', // yellow-400
              life: 0,
              maxLife: 30,
              active: true
            });
            
            
            // Win condition
            if (scoreRef.current >= WIN_SCORE) {
              setGameState('WIN');
              playSound('win');
            }
          } else {
            playSound('hit');
            createParticles(e.x + e.width/2, e.y + e.height/2, '#ffffff', 3);
          }
        }
      });
      
      // Check player collision
      if (
        player.x < e.x + e.width &&
        player.x + player.width > e.x &&
        player.y < e.y + e.height &&
        player.y + player.height > e.y
      ) {
        createParticles(player.x + player.width/2, player.y + player.height/2, '#3b82f6', 30);
        setGameState('GAME_OVER');
      }
    });
    enemiesRef.current = enemiesRef.current.filter(e => e.active);
    
    // Update Particles
    particlesRef.current.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      if (p.life >= p.maxLife) p.active = false;
    });
    particlesRef.current = particlesRef.current.filter(p => p.active);
    
    // Update Floating Texts
    floatingTextsRef.current.forEach(ft => {
      ft.y -= 2;
      ft.life++;
      if (ft.life >= ft.maxLife) ft.active = false;
    });
    floatingTextsRef.current = floatingTextsRef.current.filter(ft => ft.active);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    // Clear background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw Stars (simple background)
    ctx.fillStyle = '#ffffff';
    for(let i=0; i<30; i++) {
      ctx.globalAlpha = Math.random() * 0.5 + 0.1;
      ctx.beginPath();
      ctx.arc(
        Math.abs(Math.sin(reqIdRef.current * 0.001 + i) * CANVAS_WIDTH), 
        (reqIdRef.current * (i%3 + 1) + i * 100) % CANVAS_HEIGHT, 
        Math.random() * 2, 
        0, Math.PI*2
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Draw Player (WhiteStyle Cannon)
    const p = playerRef.current;
    
    // Cannon Base
    ctx.fillStyle = '#f8fafc'; // white
    ctx.beginPath();
    ctx.roundRect(p.x, p.y + 30, p.width, p.height - 30, 10);
    ctx.fill();
    
    // Cannon Barrel
    ctx.fillStyle = '#3b82f6'; // blue-500
    ctx.fillRect(p.x + p.width/2 - 10, p.y, 20, 40);
    
    // Whitestyle logo "W"
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('W', p.x + p.width/2, p.y + 65);

    // Draw Bullets
    bulletsRef.current.forEach(b => {
      ctx.fillStyle = '#60a5fa';
      ctx.shadowColor = '#93c5fd';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    });

    // Draw Enemies
    enemiesRef.current.forEach(e => {
      // Aura
      ctx.fillStyle = (e as any).color + '40'; // add transparency
      ctx.beginPath();
      ctx.arc(e.x + e.width/2, e.y + e.height/2, e.width/2 + 5, 0, Math.PI*2);
      ctx.fill();
      
      // Emoji
      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(e.emoji, e.x + e.width/2, e.y + e.height/2);
      
      // Text Label
      ctx.font = 'bold 14px Dotum';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(e.type, e.x + e.width/2, e.y - 10);
    });
    
    // Draw Particles
    particlesRef.current.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 1 - (p.life / p.maxLife);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });

    // Draw Floating Texts
    floatingTextsRef.current.forEach(ft => {
      ctx.globalAlpha = 1 - (ft.life / ft.maxLife);
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.globalAlpha = 1.0;
    });

    // Draw HUD
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${scoreRef.current}`, 20, 40);
    ctx.fillText(`TARGET: ${WIN_SCORE}`, 20, 70);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 py-24 font-sans relative overflow-hidden">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/board/notice" className="text-white/70 hover:text-white font-bold flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
          <span>← 돌아가기</span>
        </Link>
      </div>

      <div className="w-full max-w-[800px] aspect-[4/5] md:aspect-auto md:h-[800px] relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/50 ring-4 ring-blue-500/30">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full block bg-slate-900 cursor-crosshair touch-none"
        />

        {/* UI Overlays */}
        {gameState === 'START' && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-10">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 tracking-tighter">
              DENTAL DEFENSE
            </h1>
            <p className="text-xl text-blue-100 mb-8 font-bold">당신의 치아, 화이트스타일 대포로 지키세요!</p>
            
            <div className="flex gap-4 text-3xl mb-12 animate-bounce">
              <span>🦠</span><span>😬</span><span>🦷</span><span>👄</span>
            </div>
            
            <div className="bg-white/10 p-6 rounded-2xl mb-10 max-w-md text-left text-blue-50">
              <h3 className="font-bold text-lg mb-2 text-yellow-400">📜 임무 목표</h3>
              <p className="mb-2">충치균, 치주염 등 치아의 적들을 쏴서 물리치세요!</p>
              <p className="mb-2">점수 <strong>{WIN_SCORE}점</strong>을 달성하면 특별한 보상이 주어집니다.</p>
              <p className="text-sm text-blue-300 mt-4">* PC: 방향키 또는 마우스 이동, 스페이스바/클릭 공격<br/>* 모바일: 화면 터치 후 드래그하여 이동 (자동 공격)</p>
            </div>

            <button 
              onClick={startGame}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-2xl rounded-full shadow-[0_0_40px_rgba(59,130,246,0.6)] transform hover:scale-105 transition-all active:scale-95"
            >
              게임 시작 (START)
            </button>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-10 animate-in fade-in duration-500">
            <h2 className="text-6xl font-black text-white mb-4 drop-shadow-lg">GAME OVER</h2>
            <p className="text-2xl text-red-200 mb-8 font-bold">충치균에게 방어선이 뚫렸습니다!</p>
            <p className="text-4xl font-black text-yellow-400 mb-12">최종 점수: {score}점</p>
            
            <button 
              onClick={startGame}
              className="px-10 py-5 bg-white text-red-600 hover:bg-slate-100 font-black text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all active:scale-95"
            >
              다시 도전하기
            </button>
          </div>
        )}

        {gameState === 'WIN' && (
          <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20 animate-in zoom-in duration-700">
            <div className="text-8xl mb-6 animate-bounce">🏆</div>
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4 drop-shadow-lg">
              MISSION CLEAR!
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-bold leading-relaxed">
              축하합니다! 완벽하게 치아를 방어하셨습니다.<br/>
              당신의 치아 건강, 이제 화이트스타일치과가 책임집니다.
            </p>
            
            <div className="bg-white p-8 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.3)] mb-10 transform hover:scale-105 transition-transform cursor-pointer border-4 border-yellow-400">
              <h3 className="text-blue-900 font-bold mb-2">✨ 프리미엄 VIP 상담 ✨</h3>
              <a href="tel:1577-7287" className="block text-4xl md:text-5xl font-black text-blue-600 mb-4 hover:text-blue-500">
                📞 1577-7287
              </a>
              <p className="text-slate-500 text-sm font-medium">강남역 11번 출구 화이트스타일치과</p>
              <div className="mt-6 flex justify-center gap-4">
                <Link href="/consult" className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800">
                  온라인 상담하기
                </Link>
                <a href="https://pf.kakao.com/_xkxkTdM" target="_blank" rel="noreferrer" className="px-6 py-2 bg-yellow-400 text-yellow-900 rounded-full font-bold text-sm hover:bg-yellow-300">
                  카카오톡 문의
                </a>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="text-white/60 hover:text-white underline font-bold"
            >
              게임 다시하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
