"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverBody,
  PopoverFooter
} from '@/components/ui/popover';
import { User, Settings, LogOut } from 'lucide-react';

interface ProfilePopoverProps {
  onLogout?: () => void;
}

export function ProfilePopover({ onLogout }: ProfilePopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt="John Doe" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 bg-neutral-900 border border-neutral-700 shadow-xl"
        align="end"
        sideOffset={8}
      >
        <PopoverHeader className="border-b border-neutral-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt="John Doe" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <PopoverTitle className="text-white font-semibold">John Doe</PopoverTitle>
              <PopoverDescription className="text-gray-400">john.doe@example.com</PopoverDescription>
            </div>
          </div>
        </PopoverHeader>
        
        <PopoverBody className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-neutral-800 hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            <User className="mr-3 h-4 w-4" />
            View Profile
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-neutral-800 hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </PopoverBody>
        
        <PopoverFooter className="border-t border-neutral-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
            onClick={() => {
              setOpen(false);
              onLogout?.();
            }}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}




