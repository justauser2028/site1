import React from 'react';
import { Moon, Star, Shield } from 'lucide-react';
import Carousel from '../UI/Carousel';
import { modules } from '../../data/modules';

interface HomeProps {
  onSelectModule: (moduleId: string, lessonIndex?: number) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectModule }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Header */}
      <header className="relative px-6 py-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">Sleep Protocol</h1>
          </div>
          <p className="text-slate-300 text-lg font-medium">
            Desafio de 7 Dias para Criar uma
          </p>
          <p className="text-emerald-400 text-xl font-bold">
            Rotina de Sono Saudável
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-800">
            <Moon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">7</div>
            <div className="text-xs text-slate-400">Dias</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-800">
            <Star className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">15</div>
            <div className="text-xs text-slate-400">Aulas</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-800">
            <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">2min</div>
            <div className="text-xs text-slate-400">Técnica</div>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="px-6 mb-8">
        <div className="bg-gradient-to-r from-emerald-900/30 to-slate-900/30 rounded-2xl p-6 border border-emerald-800/30 max-w-md mx-auto">
          <blockquote className="text-center">
            <p className="text-white font-medium mb-3 italic">
              "A técnica militar que ensina soldados a dormir em 2 minutos, mesmo em condições extremas."
            </p>
            <footer className="text-emerald-400 text-sm font-bold">
              — Protocolo das Forças Armadas
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Modules Carousel */}
      <section className="px-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          Escolha seu Módulo
        </h2>
        <Carousel modules={modules} onSelectModule={(moduleId) => onSelectModule(moduleId)} />
      </section>

      {/* CTA Section */}
      <section className="px-6 mb-8">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center max-w-md mx-auto">
          <h3 className="text-lg font-bold text-white mb-2">
            Comece sua Jornada Hoje
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            Transforme suas noites e desperte com mais energia e disposição.
          </p>
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-sm font-medium">
            <Star className="w-4 h-4" />
            <span>Método comprovado cientificamente</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;