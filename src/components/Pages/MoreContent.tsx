import React from 'react';
import { Headphones, BookOpen, Brain, Gift, Star, ChevronRight } from 'lucide-react';

const MoreContent: React.FC = () => {
  const bonusContent = [
    {
      id: 'audio-guide',
      title: 'Guia de Áudio para Relaxamento',
      description: 'Meditações guiadas e sons da natureza',
      icon: Headphones,
      badge: 'Novo',
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      id: 'ebook',
      title: 'E-book: Ciência do Sono',
      description: 'Manual completo sobre higiene do sono',
      icon: BookOpen,
      badge: 'Popular',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      id: 'meditation',
      title: 'Meditações para Dormir',
      description: 'Técnicas de mindfulness para relaxar',
      icon: Brain,
      badge: '',
      color: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      id: 'bonus-videos',
      title: 'Vídeos Bônus',
      description: 'Conteúdo extra e dicas avançadas',
      icon: Gift,
      badge: 'Premium',
      color: 'bg-amber-500/20 text-amber-400'
    }
  ];

  const resources = [
    {
      title: 'Calculadora de Sono',
      description: 'Descubra seu horário ideal para dormir',
      icon: '🕒'
    },
    {
      title: 'Diário do Sono',
      description: 'Acompanhe a qualidade do seu sono',
      icon: '📖'
    },
    {
      title: 'Dicas Rápidas',
      description: 'Técnicas para implementar hoje',
      icon: '💡'
    },
    {
      title: 'Comunidade',
      description: 'Conecte-se com outros estudantes',
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="px-6 py-8 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="flex items-center gap-3 mb-2">
          <Star className="w-6 h-6 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white">Mais Conteúdos</h1>
        </div>
        <p className="text-slate-400">Recursos extras para aprimorar seu sono</p>
      </header>

      {/* Bonus Content */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Conteúdo Bônus</h2>
        <div className="space-y-4">
          {bonusContent.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    {item.badge && (
                      <span className="bg-emerald-500 text-slate-900 px-2 py-1 rounded-full text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-emerald-400 text-sm">
                      <Star className="w-4 h-4" />
                      <span>Conteúdo premium</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Recursos Úteis</h2>
        <div className="grid grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div className="text-2xl mb-2">{resource.icon}</div>
              <h3 className="text-white font-medium mb-1">{resource.title}</h3>
              <p className="text-slate-400 text-sm">{resource.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 mb-8">
        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-2xl p-6 border border-emerald-500/30">
          <h2 className="text-xl font-bold text-white mb-2">
            Unlock Premium Content
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Acesse todos os recursos premium e acelere sua jornada para um sono perfeito.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors">
            Fazer Upgrade
          </button>
        </div>
      </section>

      {/* Help Section */}
      <section className="px-6 pb-8">
        <h2 className="text-lg font-bold text-white mb-4">Precisa de Ajuda?</h2>
        <div className="space-y-3">
          <button className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-left hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Central de Ajuda</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
          
          <button className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-left hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Contato</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default MoreContent;