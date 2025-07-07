import React, { useState } from 'react';
import { ArrowLeft, Clock, Moon, Sun, Info, Calculator, Lightbulb } from 'lucide-react';

interface SleepCalculatorProps {
  onBack: () => void;
}

const SleepCalculator: React.FC<SleepCalculatorProps> = ({ onBack }) => {
  const [calculationType, setCalculationType] = useState<'bedtime' | 'wakeup'>('bedtime');
  const [inputTime, setInputTime] = useState('07:00');
  const [cycles, setCycles] = useState(5);
  const [results, setResults] = useState<{
    bedtime?: string;
    wakeup?: string;
    preparationTime?: string;
    totalSleep?: string;
  } | null>(null);

  const cycleOptions = [
    { value: 4, label: '4 ciclos (6h)', description: 'Mínimo recomendado' },
    { value: 5, label: '5 ciclos (7h30)', description: 'Ideal para adultos' },
    { value: 6, label: '6 ciclos (9h)', description: 'Sono prolongado' }
  ];

  const calculateSleep = () => {
    const [hours, minutes] = inputTime.split(':').map(Number);
    const inputDate = new Date();
    inputDate.setHours(hours, minutes, 0, 0);

    const cycleMinutes = cycles * 90; // 90 minutos por ciclo
    const totalSleepHours = Math.floor(cycleMinutes / 60);
    const totalSleepMins = cycleMinutes % 60;

    let resultDate = new Date(inputDate);
    
    if (calculationType === 'bedtime') {
      // Calcular hora de dormir baseado na hora de acordar
      resultDate.setMinutes(resultDate.getMinutes() - cycleMinutes);
      
      // Hora de preparação (15 minutos antes)
      const preparationDate = new Date(resultDate);
      preparationDate.setMinutes(preparationDate.getMinutes() - 15);

      setResults({
        bedtime: formatTime(resultDate),
        wakeup: inputTime,
        preparationTime: formatTime(preparationDate),
        totalSleep: `${totalSleepHours}h${totalSleepMins > 0 ? ` ${totalSleepMins}min` : ''}`
      });
    } else {
      // Calcular hora de acordar baseado na hora de dormir
      resultDate.setMinutes(resultDate.getMinutes() + cycleMinutes);
      
      // Hora de preparação (15 minutos antes da hora de dormir)
      const preparationDate = new Date(inputDate);
      preparationDate.setMinutes(preparationDate.getMinutes() - 15);

      setResults({
        bedtime: inputTime,
        wakeup: formatTime(resultDate),
        preparationTime: formatTime(preparationDate),
        totalSleep: `${totalSleepHours}h${totalSleepMins > 0 ? ` ${totalSleepMins}min` : ''}`
      });
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">Calculadora de Sono</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 max-w-md mx-auto">
        {/* Info Section */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Como Funciona</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                O sono acontece em ciclos de aproximadamente 90 minutos. Para acordar descansado, 
                é ideal completar ciclos inteiros. Esta calculadora ajuda você a encontrar o horário 
                perfeito para dormir ou acordar.
              </p>
            </div>
          </div>
        </div>

        {/* Calculation Type */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">O que você quer calcular?</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCalculationType('bedtime')}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                calculationType === 'bedtime'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Moon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Hora de Dormir</div>
              <div className="text-xs opacity-75">Sei quando acordar</div>
            </button>
            
            <button
              onClick={() => setCalculationType('wakeup')}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                calculationType === 'wakeup'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Sun className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Hora de Acordar</div>
              <div className="text-xs opacity-75">Sei quando dormir</div>
            </button>
          </div>
        </div>

        {/* Time Input */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-3">
            {calculationType === 'bedtime' ? 'Que horas você precisa acordar?' : 'Que horas você vai dormir?'}
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white text-lg font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-colors"
            />
          </div>
        </div>

        {/* Cycles Selection */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-3">Quantos ciclos de sono?</label>
          <div className="space-y-3">
            {cycleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCycles(option.value)}
                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                  cycles === option.value
                    ? 'bg-emerald-500/20 border-emerald-500/50'
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{option.label}</div>
                    <div className="text-slate-400 text-sm">{option.description}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    cycles === option.value
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-slate-600'
                  }`}>
                    {cycles === option.value && (
                      <div className="w-full h-full rounded-full bg-emerald-500"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateSleep}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 py-4 rounded-xl font-bold text-lg transition-colors mb-8"
        >
          Calcular Horário Ideal
        </button>

        {/* Results */}
        {results && (
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-400" />
              Seu Horário Ideal
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <Moon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Ir para a cama</div>
                    <div className="text-slate-400 text-sm">Hora de dormir</div>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold text-lg">{results.bedtime}</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Sun className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Acordar</div>
                    <div className="text-slate-400 text-sm">Hora de despertar</div>
                  </div>
                </div>
                <div className="text-blue-400 font-bold text-lg">{results.wakeup}</div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-amber-400 font-medium mb-1">Dica Importante</div>
                    <div className="text-slate-300 text-sm">
                      Vá para a cama às <span className="font-bold text-amber-400">{results.preparationTime}</span> 
                      para relaxar e adormecer naturalmente até às {results.bedtime}.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <div className="text-slate-400 text-sm">
                  Total de sono: <span className="text-emerald-400 font-medium">{results.totalSleep}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-slate-900/30 rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4">Dicas para Melhor Sono</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Mantenha um horário consistente, mesmo nos fins de semana</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Evite telas 1 hora antes de dormir</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Mantenha o quarto escuro, silencioso e fresco</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Pratique técnicas de relaxamento antes de dormir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepCalculator;