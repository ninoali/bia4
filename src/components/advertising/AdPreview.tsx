import React from 'react';
import { Badge } from '../ui/Badge';
import { Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Advertisement } from '../../types/ad';

interface AdPreviewProps {
  ad: Partial<Advertisement>;
}

export const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  return (
    <div className="glass-effect rounded-xl overflow-hidden">
      {/* Images */}
      {ad.images && ad.images.length > 0 && (
        <div className="aspect-[3/2] relative">
          <img
            src={ad.images[0].url}
            alt="Ad preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {ad.tier === 'PREMIUM' && (
              <Badge variant="gold">VIP</Badge>
            )}
            <Badge variant="primary">DIX VERIFIED</Badge>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-light mb-2">{ad.title}</h2>
          <div className="flex items-center text-white/60 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {ad.location?.city}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-white/80">{ad.description}</p>

          {/* Services */}
          {ad.services && ad.services.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                {ad.services.map((service, index) => (
                  <Badge key={index} variant="glass">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          {ad.contact && (
            <div className="flex flex-wrap gap-4">
              {ad.contact.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {ad.contact.phone}
                </div>
              )}
              {ad.contact.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {ad.contact.email}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking Button */}
        <button className="button-primary w-full flex items-center justify-center">
          <Calendar className="w-4 h-4 mr-2" />
          Book Now
        </button>
      </div>
    </div>
  );
};