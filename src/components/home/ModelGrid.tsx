import React from 'react';
import { Calendar } from 'lucide-react';

const models = [
  {
    id: 1,
    name: 'Melina',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400',
    badges: ['VIP', 'DIX VERIFIED'],
    online: true,
  },
  {
    id: 2,
    name: 'Sasha Madison',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=400',
    badges: ['VIP', 'DIX VERIFIED'],
    online: true,
  },
  {
    id: 3,
    name: 'Ingrid',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400&h=400',
    badges: ['VIP', 'DIX VERIFIED'],
    online: false,
  },
  {
    id: 4,
    name: 'Sophie',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400',
    badges: ['VIP', 'DIX VERIFIED'],
    online: true,
  },
  {
    id: 5,
    name: 'Victoria',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400',
    badges: ['DIX VERIFIED'],
    online: true,
  },
  {
    id: 6,
    name: 'Isabella',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400&h=400',
    badges: ['VIP', 'DIX VERIFIED'],
    online: false,
  },
];

export const ModelGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {models.map((model) => (
        <div key={model.id} className="group cursor-pointer">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-cover"
            />
            
            {/* Badges Overlay */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
              {model.badges.map((badge, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded
                    ${badge === 'VIP' 
                      ? 'bg-[#6B46C1] text-white' 
                      : 'bg-[#9F7AEA] text-white'}`}
                >
                  {badge}
                </div>
              ))}
            </div>
            
            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{model.name}</span>
                <div className="flex items-center gap-2">
                  {model.online && (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};