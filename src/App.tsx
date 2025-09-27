import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ProfileSetup } from './components/ProfileSetup';
import { CommunitySelection } from './components/CommunitySelection';
import { Dashboard } from './components/Dashboard';
import { EventDemo } from './components/EventDemo';

export type UserProfile = {
  name: string;
  year: string;
  interests: string[];
  preferences: {
    groupSize: string;
    genderPreference: string;
    timePreference: string;
    activityTypes: string[];
  };
  community: string;
};

export type AppScreen = 'welcome' | 'profile' | 'community' | 'dashboard' | 'event-demo';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleScreenChange = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onNext={() => handleScreenChange('profile')} />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileSetup 
          onNext={() => handleScreenChange('community')}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
      
      {currentScreen === 'community' && (
        <CommunitySelection 
          onNext={() => handleScreenChange('dashboard')}
          onCommunitySelect={(community) => {
            if (userProfile) {
              handleProfileUpdate({ ...userProfile, community });
            }
          }}
        />
      )}
      
      {currentScreen === 'dashboard' && userProfile && (
        <Dashboard 
          userProfile={userProfile}
          onProfileEdit={() => handleScreenChange('profile')}
        />
      )}

      {currentScreen === 'event-demo' && (
        <EventDemo />
      )}
    </div>
  );
}