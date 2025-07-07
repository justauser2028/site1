import React, { useState } from 'react';
import { ArrowLeft, Clock, Moon, Sun, Info, Calculator, Lightbulb, ChevronDown } from 'lucide-react';

interface SleepCalculatorProps {
  onBack: () => void;
}

const SleepCalculator: React.FC<SleepCalculatorProps> = ({ onBack }) => {
  const [calculationType, setCalculationType] = useState<'wakeup' | 'bedtime'>('wakeup');
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [cycles, setCycles] = useState(5);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [showMinutePicker, setShowMinutePicker] = useState(false);
  const [results, setResults] = useState<{
    bedtime?: string;
    wakeup?: string;
    preparationTime?: string;
    totalSleep?: string;
  } | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const cycleOptions = [
    { value: 4, label: '4 ciclos', duration: '6h', description: 'Mínimo recomendado' },
    { value: 5, label: '5 ciclos', duration: '7h30', description: 'Ideal para adultos' },
    { value: 6, label: '6 ciclos', duration: '9h', description: 'Sono prolongado' }
  ];

  const formatTime = (hour: number, minute: number): string => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const calculateSleep = () => {
    const inputDate = new Date();
    inputDate.setHours(selectedHour, selectedMinute, 0, 0);

    const cycleMinutes = cycles * 90; // 90 minutos por ciclo
    const totalSleepHours = Math.floor(cycleMinutes / 60);
    const totalSleepMins = cycleMinutes % 60;

    let resultDate = new Date(inputDate);
    
    if (calculationType === 'wakeup') {
      // Calcular hora de dormir baseado na hora de acordar
      resultDate.setMinutes(resultDate.getMinutes() - cycleMinutes);
      
      // Hora de preparação (15 minutos antes)
      const preparationDate = new Date(resultDate);
      preparationDate.setMinutes(preparationDate.getMinutes() - 15);

      setResults({
        bedtime: formatTimeFromDate(resultDate),
        wakeup: formatTime(selectedHour, selectedMinute),
        preparationTime: formatTimeFromDate(preparationDate),
        totalSleep: `${totalSleepHours}h${totalSleepMins > 0 ? ` ${totalSleepMins}min` : ''}`
      });
    } else {
      // Calcular hora de acordar baseado na hora de dormir
      resultDate.setMinutes(resultDate.getMinutes() + cycleMinutes);
      
      // Hora de preparação (15 minutos antes da hora de dormir)
      const preparationDate = new Date(inputDate);
      preparationDate.setMinutes(preparationDate.getMinutes() - 15);

      setResults({
        bedtime: formatTime(selectedHour, selectedMinute),
        wakeup: formatTimeFromDate(resultDate),
        preparationTime: formatTimeFromDate(preparationDate),
        totalSleep: `${totalSleepHours}h${totalSleepMins > 0 ? ` ${totalSleepMins}min` : ''}`
      });
    }

    // Scroll suave para os resultados
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const formatTimeFromDate = (date: Date): string => {
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
                Escolha a hora em que deseja acordar ou dormir e descubra a melhor hora para 
                completar 5 ciclos de sono reparador. Cada ciclo dura 90 minutos.
              </p>
            </div>
          </div>
        </div>

        {/* Calculation Type */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">O que você quer calcular?</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setCalculationType('wakeup');
                setResults(null);
              }}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                calculationType === 'wakeup'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Moon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Desejo Acordar</div>
              <div className="text-xs opacity-75">Calcular hora de dormir</div>
            </button>
            
            <button
              onClick={() => {
                setCalculationType('bedtime');
                setResults(null);
              }}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                calculationType === 'bedtime'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Sun className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Desejo Dormir</div>
              <div className="text-xs opacity-75">Calcular hora de acordar</div>
            </button>
          </div>
        </div>

        {/* Time Input */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-4">
            {calculationType === 'wakeup' 
              ? 'Que horas você precisa acordar?' 
              : 'Que horas você vai dormir?'
            }
          </label>
          
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-center gap-4">
              {/* Hour Picker */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowHourPicker(!showHourPicker);
                    setShowMinutePicker(false);
                  }}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                    {selectedHour.toString().padStart(2, '0')}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                
                {showHourPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                    {hours.map((hour) => (
                      <button
                        key={hour}
                        onClick={() => {
                          setSelectedHour(hour);
                          setShowHourPicker(false);
                          setResults(null);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors ${
                          selectedHour === hour ? 'bg-emerald-500/20 text-emerald-400' : 'text-white'
                        }`}
                      >
                        {hour.toString().padStart(2, '0')}h
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-2xl font-bold text-slate-400">:</span>

              {/* Minute Picker */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowMinutePicker(!showMinutePicker);
                    setShowHourPicker(false);
                  }}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                    {selectedMinute.toString().padStart(2, '0')}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                
                {showMinutePicker && (
                  <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                    {minutes.map((minute) => (
                      <button
                        key={minute}
                        onClick={() => {
                          setSelectedMinute(minute);
                          setShowMinutePicker(false);
                          setResults(null);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors ${
                          selectedMinute === minute ? 'bg-emerald-500/20 text-emerald-400' : 'text-white'
                        }`}
                      >
                        {minute.toString().padStart(2, '0')}min
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center mt-3">
              <div className="text-slate-400 text-sm">
                Horário selecionado: <span className="text-emerald-400 font-medium">
                  {formatTime(selectedHour, selectedMinute)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cycles Selection */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-4">Quantos ciclos de sono?</label>
          <div className="space-y-3">
            {cycleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setCycles(option.value);
                  setResults(null);
                }}
                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                  cycles === option.value
                    ? 'bg-emerald-500/20 border-emerald-500/50'
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{option.label} ({option.duration})</div>
                    <div className="text-slate-400 text-sm">{option.description}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    cycles === option.value
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-slate-600'
                  }`}>
                    {cycles === option.value && (
                      <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Guidance Text */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-blue-400 font-medium mb-1">Como usar</div>
              <div className="text-slate-300 text-sm">
                {calculationType === 'wakeup' 
                  ? 'Defina a hora que você precisa acordar e descubra quando deve ir dormir para completar ciclos completos de sono.'
                  : 'Defina a hora que você pretende dormir e descubra quando deve acordar para completar ciclos completos de sono.'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateSleep}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 py-4 rounded-xl font-bold text-lg transition-colors mb-8 flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calcular Horário Ideal
        </button>

        {/* Results */}
        {results && (
          <div id="results-section" className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 mb-8 scroll-mt-32">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-400" />
              Seu Horário Ideal
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <Moon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Ir para a cama</div>
                    <div className="text-slate-400 text-sm">Hora de dormir</div>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold text-xl">{results.bedtime}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Sun className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Acordar</div>
                    <div className="text-slate-400 text-sm">Hora de despertar</div>
                  </div>
                </div>
                <div className="text-blue-400 font-bold text-xl">{results.wakeup}</div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-amber-400 font-medium mb-1">💡 Dica Importante</div>
                    <div className="text-slate-300 text-sm">
                      Vá para a cama às <span className="font-bold text-amber-400">{results.preparationTime}</span> 
                      para relaxar e adormecer naturalmente até às {results.bedtime}.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <div className="text-slate-400 text-sm">
                  Total de sono: <span className="text-emerald-400 font-medium">{results.totalSleep}</span> • 
                  <span className="text-emerald-400 font-medium"> {cycles} ciclos completos</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-slate-900/30 rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4">💤 Dicas para Melhor Sono</h3>
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
              <p>Mantenha o quarto escuro, silencioso e fresco (18-21°C)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Pratique técnicas de relaxamento antes de dormir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para fechar dropdowns */}
      {(showHourPicker || showMinutePicker) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowHourPicker(false);
            setShowMinutePicker(false);
          }}
        />
      )}
    </div>
  );
};

export default SleepCalculator;