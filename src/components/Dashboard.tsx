import React, { useState } from 'react';
import { AIChat } from './AIChat';
import { EventFeed } from './EventFeed';
import { ProfileSidebar } from './ProfileSidebar';
import { EventConfirmationNotification } from './EventConfirmationNotification';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Bell, Menu, X, Calendar, MessageCircle, Home } from 'lucide-react';
import { UserProfile } from '../App';
import { SmallDecorationIllustration } from './Illustrations';

interface DashboardProps {
  userProfile: UserProfile;
  onProfileEdit: () => void;
}

export function Dashboard({ userProfile, onProfileEdit }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('events');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Football Watch Party Confirmed!',
      message: '5 people are interested in watching the Georgia Tech vs UGA game this Saturday',
      time: '2 hours ago',
      type: 'event-confirmed'
    },
    {
      id: 2,
      title: 'New Event Match',
      message: 'Study group for CS 2110 - 3 people with similar preferences found',
      time: '5 hours ago',
      type: 'match-found'
    }
  ]);

  const [eventConfirmation, setEventConfirmation] = useState({
    id: 'confirm-1',
    title: 'GT vs UGA Watch Party',
    date: 'Tomorrow, Nov 25',
    time: '3:30 PM - 6:30 PM',
    location: 'Student Center - Main Lounge',
    venue: 'Student Center - Main Lounge, 353 Ferst Dr NW, Atlanta, GA 30313',
    attendees: 12,
    image: 'https://images.unsplash.com/photo-1547055648-bc6fdb42d168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9yZ2lhJTIwdGVjaCUyMGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwxfHx8fDE3NTg5ODE5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    organizerMessage: 'Hey everyone! So excited to watch the big game together. Pizza will be delivered at 3:00 PM, and we\'ll have drinks and snacks throughout. Come early to get the best seats!',
    lastMinuteDetails: [
      'Pizza delivery confirmed for 3:00 PM',
      'Big screen TV reserved for the main lounge',
      'Bring your Yellow Jacket spirit!',
      'Parking available in the Student Center deck'
    ],
    weatherInfo: 'Perfect day for the game! Sunny and 68°F',
    parkingInfo: 'Free parking available in Student Center deck. Entrance on Ferst Drive.',
    contactInfo: 'Questions? Text the organizer at (404) 555-0123'
  });
  
  const [showEventConfirmation, setShowEventConfirmation] = useState(true);

  const clearNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleAddToCalendar = (event: any) => {
    console.log('Adding to calendar:', event);
    // In a real app, this would integrate with calendar APIs
  };

  const handleGetDirections = (venue: string) => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(venue)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background texture-paper">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 texture-organic shadow-natural">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-foreground">Touch Grass</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </div>
            <div className="text-sm">
              <p className="text-foreground">{userProfile.name}</p>
              <p className="text-muted-foreground">{userProfile.year}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-30 lg:z-0
          w-80 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto
        `}>
          <div className="p-4 lg:hidden border-b border-sidebar-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="float-right"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <ProfileSidebar userProfile={userProfile} onEdit={onProfileEdit} />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Event Confirmation Notification */}
          {showEventConfirmation && (
            <div className="p-4 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 border-b border-primary/20">
              <EventConfirmationNotification
                confirmation={eventConfirmation}
                onDismiss={() => setShowEventConfirmation(false)}
                onAddToCalendar={handleAddToCalendar}
                onGetDirections={handleGetDirections}
              />
            </div>
          )}

          {/* Regular Notifications */}
          {notifications.length > 0 && (
            <div className="bg-primary/5 border-b border-primary/20 p-4 texture-organic">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card key={notification.id} className="p-4 bg-card shadow-natural border-organic grass-decoration">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm text-foreground mb-1">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearNotification(notification.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tabs for main content */}
          <div className="flex-1 p-4 relative">
            {/* Background decorations */}
            <div className="absolute top-8 right-8 opacity-20">
              <SmallDecorationIllustration className="w-6 h-6" />
            </div>
            <div className="absolute bottom-12 left-8 opacity-15">
              <SmallDecorationIllustration className="w-8 h-8" />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 mb-4 bg-accent/50 border-organic">
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  AI Chat
                </TabsTrigger>
                <TabsTrigger value="home" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="flex-1 mt-0">
                <EventFeed userProfile={userProfile} />
              </TabsContent>

              <TabsContent value="chat" className="flex-1 mt-0">
                <div className="h-full">
                  <AIChat userProfile={userProfile} />
                </div>
              </TabsContent>

              <TabsContent value="home" className="flex-1 mt-0">
                <div className="h-full flex items-center justify-center">
                  <Card className="max-w-md p-8 text-center texture-organic border-organic shadow-natural">
                    <h3 className="text-lg text-foreground mb-4">Welcome to Touch Grass!</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Ready to explore campus events and meet new people? Check out the Events tab or chat with our AI to find your perfect activity.
                    </p>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => setActiveTab('events')} 
                        className="w-full border-organic"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Browse Events
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('chat')} 
                        variant="outline" 
                        className="w-full border-organic"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat with AI
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}