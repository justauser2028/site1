import React, { useState } from 'react';
import BottomNav from './BottomNav';
import Home from '../Pages/Home';
import ContinueWatching from '../Pages/ContinueWatching';
import MoreContent from '../Pages/MoreContent';
import Settings from '../Pages/Settings';
import Module from '../Pages/Module';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);

  const handleTabChange = (tab: string) => {
    // Se estamos em um módulo e clicando em outra aba, primeiro sair do módulo
    if (selectedModule) {
      setSelectedModule(null);
      setSelectedLessonIndex(0);
    }
    
    setActiveTab(tab);
  };

  const handleSelectModule = (moduleId: string, lessonIndex: number = 0) => {
    setSelectedModule(moduleId);
    setSelectedLessonIndex(lessonIndex);
  };

  const renderContent = () => {
    if (selectedModule) {
      return (
        <Module
          moduleId={selectedModule}
          initialLessonIndex={selectedLessonIndex}
          onBack={() => {
            setSelectedModule(null);
            setSelectedLessonIndex(0);
          }}
          onSelectModule={handleSelectModule}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home onSelectModule={handleSelectModule} />;
      case 'continue':
        return <ContinueWatching onSelectModule={handleSelectModule} />;
      case 'more':
        return <MoreContent />;
      case 'settings':
        return <Settings />;
      default:
        return <Home onSelectModule={handleSelectModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      <main className="relative">
        {renderContent()}
      </main>
      <BottomNav 
        activeTab={selectedModule ? 'home' : activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default Layout;