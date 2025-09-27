import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar, MapPin, Users, Clock, Heart, MessageCircle, Share, Bot } from 'lucide-react';
import { UserProfile } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SmallDecorationIllustration, EventsIllustration } from './Illustrations';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  tags: string[];
  image?: string;
  isInterested: boolean;
  isAttending: boolean;
}

interface EventFeedProps {
  userProfile: UserProfile;
}

export function EventFeed({ userProfile }: EventFeedProps) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'GT vs UGA Watch Party',
      description: 'Watch the big rivalry game with fellow Yellow Jackets! Pizza and drinks provided. Come early for the best seats!',
      date: 'Nov 25',
      time: '3:30 PM',
      location: 'Student Center - Main Lounge',
      organizer: 'AI Organized',
      attendees: 8,
      maxAttendees: 15,
      tags: ['Sports', 'Social', 'Food'],
      image: 'https://images.unsplash.com/photo-1547055648-bc6fdb42d168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9yZ2lhJTIwdGVjaCUyMGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwxfHx8fDE3NTg5ODE5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isInterested: true,
      isAttending: false
    },
    {
      id: '2',
      title: 'CS 2110 Study Group',
      description: 'Collaborative study session focusing on data structures and algorithms. Bring your laptop and notes!',
      date: 'Nov 23',
      time: '7:00 PM',
      location: 'Klaus Building - Room 2425',
      organizer: 'AI Organized',
      attendees: 5,
      maxAttendees: 8,
      tags: ['Study', 'Computer Science', 'Academic'],
      image: 'https://images.unsplash.com/photo-1637255499922-f15bc6c4153f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZHklMjBsaWJyYXJ5JTIwY296eXxlbnwxfHx8fDE3NTg5ODE5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isInterested: false,
      isAttending: true
    },
    {
      id: '3',
      title: 'Friday Night Social Mixer',
      description: 'Meet new people in a casual, fun environment. Music, games, and conversations! Free snacks included.',
      date: 'Nov 24',
      time: '8:00 PM',
      location: 'Student Activities Center',
      organizer: 'AI Organized',
      attendees: 12,
      maxAttendees: 25,
      tags: ['Social', 'Music', 'Games', 'Food'],
      image: 'https://images.unsplash.com/photo-1758275557720-37123c8eea5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc29jaWFsJTIwbWl4ZXIlMjBwYXJ0eXxlbnwxfHx8fDE3NTg5ODE5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isInterested: false,
      isAttending: false
    },
    {
      id: '4',
      title: 'Photography Walk Around Campus',
      description: 'Explore GT campus with fellow photography enthusiasts. All skill levels welcome! Cameras provided if needed.',
      date: 'Nov 26',
      time: '2:00 PM',
      location: 'Tech Tower (Meet Point)',
      organizer: 'AI Organized',
      attendees: 6,
      maxAttendees: 12,
      tags: ['Photography', 'Outdoor', 'Art', 'Nature'],
      image: 'https://images.unsplash.com/photo-1755192627753-8b3b463b5aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBwaG90b2dyYXBoeSUyMG5hdHVyZSUyMHdhbGt8ZW58MXx8fHwxNzU4OTgxOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isInterested: true,
      isAttending: false
    }
  ]);

  const handleInterest = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isInterested: !event.isInterested }
        : event
    ));
  };

  const handleAttend = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isAttending: !event.isAttending,
            attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
  };

  return (
    <div className="h-screen overflow-y-auto texture-paper relative">
      {/* Background decorations */}
      <div className="absolute top-20 right-4 opacity-15 z-0">
        <SmallDecorationIllustration className="w-12 h-12" />
      </div>
      <div className="absolute top-80 left-2 opacity-10 z-0">
        <SmallDecorationIllustration className="w-8 h-8" />
      </div>
      
      <div className="p-4 border-b border-border bg-card sticky top-0 z-10 texture-organic shadow-natural">
        <div className="flex items-center gap-3 mb-2">
          <EventsIllustration className="w-8 h-6" />
          <h2 className="text-lg text-foreground">AI-Curated Events</h2>
        </div>
        <p className="text-sm text-muted-foreground">Events organized just for your community</p>
        <div className="w-full h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full mt-2" />
      </div>
      
      <div className="p-4 space-y-6 relative z-10">
        {events.map((event, index) => (
          <Card key={event.id} className={`overflow-hidden shadow-leaf grass-decoration border-organic transition-all duration-300 hover:shadow-natural hover:scale-[1.02] ${
            index % 2 === 0 ? 'texture-organic' : 'texture-grass'
          }`}>
            {event.image && (
              <div className="relative">
                <ImageWithFallback 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs border-organic">
                    {event.date}
                  </Badge>
                </div>
                {event.attendees >= event.maxAttendees && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-500/90 backdrop-blur-sm text-white text-xs">
                      Full
                    </Badge>
                  </div>
                )}
              </div>
            )}
            
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-foreground mb-2 leading-tight">{event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{event.description}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-accent/30 rounded-md border-organic">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-accent/30 rounded-md border-organic">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-accent/30 rounded-md border-organic">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees}/{event.maxAttendees} attending</span>
                    {event.attendees >= event.maxAttendees * 0.8 && (
                      <Badge variant="outline" className="text-xs ml-auto">
                        Almost Full!
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className={`text-xs border-organic ${
                        tagIndex % 3 === 0 ? 'bg-primary/10 text-primary' : 
                        tagIndex % 3 === 1 ? 'bg-accent text-accent-foreground' : 
                        'bg-muted text-muted-foreground'
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg border-organic">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary/20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{event.organizer}</p>
                      <p className="text-xs text-muted-foreground">by Touch Grass AI</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant={event.isInterested ? "default" : "outline"}
                    size="sm"
                    className={`flex-1 h-9 text-xs border-organic transition-all duration-200 ${
                      event.isInterested ? 'shadow-natural' : 'hover:shadow-natural'
                    }`}
                    onClick={() => handleInterest(event.id)}
                  >
                    <Heart className={`w-3 h-3 mr-2 ${event.isInterested ? 'fill-current' : ''}`} />
                    {event.isInterested ? 'Interested' : 'Interest'}
                    {event.isInterested && <div className="ml-1 w-1 h-1 bg-red-400 rounded-full animate-pulse" />}
                  </Button>
                  
                  <Button
                    variant={event.isAttending ? "default" : "outline"}
                    size="sm"
                    className={`flex-1 h-9 text-xs border-organic transition-all duration-200 ${
                      event.isAttending ? 'shadow-natural bg-green-600 hover:bg-green-700' : 'hover:shadow-natural'
                    }`}
                    onClick={() => handleAttend(event.id)}
                    disabled={event.attendees >= event.maxAttendees && !event.isAttending}
                  >
                    {event.isAttending ? 'Attending ✓' : event.attendees >= event.maxAttendees ? 'Full' : 'RSVP'}
                  </Button>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-border/50">
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Chat
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Share className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="p-6 text-center border-dashed border-2 border-primary/20 texture-stone">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">No more events to show</p>
              <p className="text-xs text-muted-foreground">Want to see more events that match your interests?</p>
            </div>
            <Button variant="outline" size="sm" className="border-organic shadow-natural">
              Discover More Events
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}