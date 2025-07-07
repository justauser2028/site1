import React from 'react';
import { Play, Clock, CheckCircle } from 'lucide-react';
import { Module } from '../../types';
import { useProgress } from '../../hooks/useProgress';

interface ModuleCardProps {
  module: Module;
  onSelect: (moduleId: string) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onSelect }) => {
  const { getModuleProgress } = useProgress();
  const progress = getModuleProgress(module.id);
  const completionPercentage = progress ? Math.round((progress.completedLessons / module.lessons.length) * 100) : 0;

  return (
    <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/20">
      <div className="aspect-[4/3] relative">
        <img
          src={module.coverImage}
          alt={module.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        {progress && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            {completionPercentage}%
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">{module.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <div className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              <span>{module.lessons.length} aulas</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>~45 min</span>
            </div>
          </div>
          
          <button
            onClick={() => onSelect(module.id)}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-2 rounded-full font-bold transition-colors duration-200"
          >
            Acessar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;