/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Verified, Check, ArrowLeft } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'loading' | 'gate' | 'portal'>('loading');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => {
        setStep('gate');
      }, 2800); // Slightly longer than the 2.5s progress bar animation
      return () => clearTimeout(timer);
    }
  }, [step]);
  return (
    <div className="relative min-h-screen w-full bg-surface overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Subtle Texture Layer */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{ 
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6BAnTwXoB6pilGz8g3p5tJdNwJ2o5wgx3fMcm7yj_yrntGqhtRvm_daOfF3Hg_qoMwTvxm2Rr5dfh_DV0DBCZERT_g8Kc75uUFKeyNHv4sUpNPDiPKAt6cNHoZQMc-_txGgDR3DpBEmCp9TEmsSCVB9vqySqn9yFlX0BGbYZWUx_hDSA3YODWiRwJDAlu4dnFg96pZyQUJBATB9yUn-xOQSQWxo-nlBK9AmVm-Yqh6f498O7Tinc7rsxDauTflOTANGb2j6sbJHc")` 
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-surface-container-lowest to-transparent">
        <div className="flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            {/* Branding removed as requested */}
          </div>
        </div>
      </header>

      <main className="relative z-10 min-h-screen w-full flex items-center justify-center p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md text-center space-y-8"
            >
              <div className="space-y-4">
                <p className="text-on-surface-variant text-sm font-medium tracking-wide">
                  CARREGANDO SEU CONTEÚDO
                </p>
                <div className="w-full h-[2px] bg-surface-container-highest rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-container to-primary rounded-full animate-progress" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 'gate' && (
            <motion.section
              key="gate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <div className="bg-surface-container-low backdrop-blur-3xl rounded-40 p-8 md:p-12 shadow-[0px_24px_48px_rgba(0,0,0,0.4)] border border-primary/10 relative overflow-hidden">
                {/* Inner Glow */}
                <div className="absolute inset-0 pointer-events-none rounded-40 shadow-[inset_0_0_80px_rgba(255,183,213,0.03)]" />

                <div className="flex flex-col items-center mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="text-primary w-4 h-4" />
                    <span className="font-headline text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                      PORTAL VERRANE
                    </span>
                  </div>
                  <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface text-center tracking-tight leading-tight">
                    ACESSO<br />PRIVADO
                  </h1>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm">
                    <Verified className="w-5 h-5" />
                    <span>Acesso liberado com sucesso.</span>
                  </div>

                  <div className="bg-surface-container-lowest/50 p-6 rounded-2xl border border-outline-variant/10">
                    <p className="text-xs text-on-surface-variant text-center mb-6 leading-relaxed">
                      Este acesso é reservado para você. Confirme que deseja acessar o conteúdo.
                    </p>
                    
                    <label className="flex items-center justify-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={confirmed}
                          onChange={(e) => setConfirmed(e.target.checked)}
                          className="peer appearance-none w-5 h-5 rounded-md border-2 border-outline-variant bg-transparent checked:bg-primary-container checked:border-primary-container transition-all duration-300 cursor-pointer"
                        />
                        <Check className="absolute w-3.5 h-3.5 text-on-primary-container opacity-0 peer-checked:opacity-100 transition-opacity left-1/2 -translate-x-1/2 pointer-events-none" />
                      </div>
                      <span className="text-sm font-medium text-on-surface/80 group-hover:text-primary transition-colors">
                        Confirmo que desejo continuar.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-col gap-4">
                    <a
                      href={confirmed ? "https://isabellaverrane.netlify.app/" : "#"}
                      onClick={(e) => !confirmed && e.preventDefault()}
                      className={`block w-full text-center py-4 px-6 font-headline font-bold text-sm tracking-widest rounded-full transition-all duration-500 active:scale-95 shadow-lg
                        ${confirmed 
                          ? 'bg-gradient-to-br from-primary-container to-primary text-on-primary shadow-primary/20 hover:shadow-primary/30 cursor-pointer' 
                          : 'bg-surface-container-highest text-on-surface/30 cursor-not-allowed shadow-none pointer-events-none'
                        }`}
                    >
                      ACESSAR CONTEÚDO
                    </a>
                    <button className="w-full py-3 text-on-surface-variant hover:text-primary font-medium text-xs tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2">
                      <ArrowLeft className="w-3 h-3" />
                      Voltar
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center opacity-30">
                <span className="font-headline font-bold tracking-[0.5em] text-on-surface text-[10px] uppercase">
                  Isabella Verrane
                </span>
              </div>
            </motion.section>
          )}

          {step === 'portal' && (
            <motion.section
              key="portal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-5xl space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="font-headline text-5xl md:text-7xl font-light tracking-tighter text-on-surface">
                  The <span className="font-bold text-primary italic">Isabella</span> Experience
                </h2>
                <p className="text-on-surface-variant max-w-xl mx-auto text-lg font-light leading-relaxed">
                  Bem-vinda ao seu espaço privado. Aqui, a sofisticação encontra a exclusividade em cada detalhe.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="aspect-[3/4] rounded-3xl overflow-hidden bg-surface-container-high relative group"
                  >
                    <img 
                      src={`https://picsum.photos/seed/velvet${i}/800/1200`} 
                      alt={`Exclusive Content ${i}`}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-2">Coleção 0{i}</p>
                      <h3 className="font-headline text-xl font-bold text-on-surface">Essência Minimalista</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setStep('gate')}
                  className="px-8 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all text-sm tracking-widest uppercase font-medium"
                >
                  Encerrar Sessão
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
