import React, { useState } from 'react';
import { User, Bell, Moon, Shield, Info, LogOut, ChevronRight } from 'lucide-react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const settingsGroups = [
    {
      title: 'Conta',
      items: [
        { id: 'profile', label: 'Perfil', icon: User, action: 'navigate' },
        { id: 'notifications', label: 'Notificações', icon: Bell, action: 'toggle', value: notifications, setValue: setNotifications },
        { id: 'theme', label: 'Tema escuro', icon: Moon, action: 'toggle', value: darkMode, setValue: setDarkMode }
      ]
    },
    {
      title: 'Privacidade',
      items: [
        { id: 'privacy', label: 'Privacidade', icon: Shield, action: 'navigate' },
        { id: 'data', label: 'Dados e armazenamento', icon: Info, action: 'navigate' }
      ]
    },
    {
      title: 'Suporte',
      items: [
        { id: 'help', label: 'Central de ajuda', icon: Info, action: 'navigate' },
        { id: 'about', label: 'Sobre o app', icon: Info, action: 'navigate' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="px-6 py-8 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-slate-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">João Silva</h1>
            <p className="text-slate-400">joao.silva@email.com</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-800">
            <div className="text-2xl font-bold text-white mb-1">5</div>
            <div className="text-xs text-slate-400">Dias ativos</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-800">
            <div className="text-2xl font-bold text-white mb-1">12</div>
            <div className="text-xs text-slate-400">Aulas assistidas</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-800">
            <div className="text-2xl font-bold text-white mb-1">80%</div>
            <div className="text-xs text-slate-400">Progresso</div>
          </div>
        </div>
      </header>

      {/* Settings Groups */}
      <div className="px-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h2 className="text-lg font-bold text-white mb-4">{group.title}</h2>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors cursor-pointer ${
                    itemIndex !== group.items.length - 1 ? 'border-b border-slate-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-slate-400" />
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                  
                  {item.action === 'toggle' && item.setValue && (
                    <button
                      onClick={() => item.setValue(!item.value)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        item.value ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                          item.value ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                  
                  {item.action === 'navigate' && (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sign Out */}
      <div className="px-6 py-8">
        <button className="w-full bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-left hover:bg-red-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Sair da conta</span>
          </div>
        </button>
      </div>

      {/* Version Info */}
      <div className="px-6 pb-8">
        <div className="text-center text-slate-500 text-sm">
          <p>Sleep Protocol App</p>
          <p>Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;