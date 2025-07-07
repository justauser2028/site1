import React, { useState } from 'react';
import { Play, Clock, ChevronRight, RotateCcw, ArrowRight, CheckCircle } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { modules } from '../../data/modules';

interface ContinueWatchingProps {
  onSelectModule: (moduleId: string, lessonIndex?: number) => void;
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ onSelectModule }) => {
  const { getRecentlyWatched, resetAllProgress } = useProgress();
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(false);
  const recentlyWatched = getRecentlyWatched();

  const handleResetProgress = () => {
    setShowResetConfirmation(true);
  };

  const confirmReset = () => {
    resetAllProgress();
    setShowResetConfirmation(false);
    setShowStartScreen(true);
  };

  const cancelReset = () => {
    setShowResetConfirmation(false);
  };

  const handleStartFromBeginning = () => {
    setShowStartScreen(false);
    // Levar para a aula 1 do módulo 1
    onSelectModule(modules[0].id, 0);
  };

  // Tela de confirmação de reset
  if (showResetConfirmation) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              Resetar Todo o Progresso?
            </h2>
            <p className="text-slate-400 mb-6 text-sm">
              Esta ação irá apagar permanentemente todo o seu progresso em todos os módulos. 
              Você terá que começar do zero. Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelReset}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                Resetar Tudo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de início após reset
  if (showStartScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Progresso Resetado!
          </h2>
          <p className="text-slate-400 mb-8 text-sm">
            Seu progresso foi completamente resetado. Agora você pode começar sua jornada 
            do Sleep Protocol desde o início e descobrir novamente as técnicas militares 
            para dormir melhor.
          </p>
          <button
            onClick={handleStartFromBeginning}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2 mx-auto text-lg"
          >
            <Play className="w-5 h-5" />
            Começar Agora
          </button>
          <p className="text-slate-500 text-xs mt-4">
            Você será direcionado para a primeira aula do primeiro módulo
          </p>
        </div>
      </div>
    );
  }

  if (recentlyWatched.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <Play className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Nenhum progresso ainda
          </h2>
          <p className="text-slate-400 mb-6">
            Comece assistindo algum módulo para aparecer aqui
          </p>
          <button
            onClick={() => onSelectModule(modules[0].id)}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Começar Agora
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="px-6 py-8 bg-gradient-to-b from-slate-900/50 to-transparent">
        <h1 className="text-2xl font-bold text-white mb-2">Continuar Assistindo</h1>
        <p className="text-slate-400">Retome de onde parou</p>
      </header>

      {/* Continue Watching List */}
      <div className="px-6 space-y-4 mb-8">
        {recentlyWatched.map((progress) => {
          const module = modules.find(m => m.id === progress.moduleId);
          if (!module) return null;

          const completionPercentage = Math.round((progress.completedLessons / module.lessons.length) * 100);
          const currentLesson = module.lessons[progress.currentLesson];
          const lastWatched = new Date(progress.lastWatched).toLocaleDateString('pt-BR');
          
          // Verificar se o módulo está completo
          const isModuleCompleted = progress.completedLessons >= module.lessons.length;
          
          // Encontrar o próximo módulo
          const currentModuleIndex = modules.findIndex(m => m.id === progress.moduleId);
          const nextModule = currentModuleIndex < modules.length - 1 ? modules[currentModuleIndex + 1] : null;
          const nextModuleNumber = currentModuleIndex + 2;

          return (
            <div
              key={progress.moduleId}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={module.coverImage}
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                      {module.title}
                    </h3>
                    {isModuleCompleted && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-2">
                    Última visualização: {lastWatched}
                  </p>
                  
                  {currentLesson && !isModuleCompleted && (
                    <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
                      <Play className="w-4 h-4" />
                      <span className="line-clamp-1">{currentLesson.title}</span>
                    </div>
                  )}

                  {isModuleCompleted && (
                    <div className="flex items-center gap-2 text-sm text-emerald-400 mb-3">
                      <CheckCircle className="w-4 h-4" />
                      <span>Módulo concluído!</span>
                    </div>
                  )}
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progresso</span>
                      <span>{completionPercentage}%</span>
                    </div>
                    <div className="bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isModuleCompleted ? 'bg-emerald-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{progress.completedLessons}/{module.lessons.length} aulas</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectModule(progress.moduleId, progress.currentLesson)}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-4 py-2 rounded-full font-medium transition-colors"
                      >
                        <span>Continuar</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Next Module Button - Only show if module is completed and there's a next module */}
                  {isModuleCompleted && nextModule && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <button
                        onClick={() => onSelectModule(nextModule.id, 0)}
                        className="w-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-3 hover:from-emerald-500/30 hover:to-emerald-600/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-center gap-2 text-emerald-400">
                          <span className="font-medium">Seguir para o Módulo {nextModuleNumber}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-8">
        <h2 className="text-lg font-bold text-white mb-4">Ações Rápidas</h2>
        <div className="space-y-3">
          <button 
            onClick={handleResetProgress}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-left hover:bg-slate-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                <div>
                  <span className="text-white font-medium block">Resetar progresso</span>
                  <span className="text-slate-400 text-sm">Apagar todo o histórico de visualização</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueWatching;