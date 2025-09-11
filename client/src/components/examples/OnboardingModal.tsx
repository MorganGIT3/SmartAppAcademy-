import { useState } from 'react';
import { OnboardingModal } from '../OnboardingModal';
import { Button } from '@/components/ui/button';

export default function OnboardingModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Onboarding</Button>
      <OnboardingModal open={open} onOpenChange={setOpen} />
    </div>
  );
}