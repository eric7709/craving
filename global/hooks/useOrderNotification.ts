// hooks/useOrderNotifications.ts
import { useOrderDataStore } from '@/modules/Order/store/useOrderDataStore';
import { useEffect, useRef, useCallback } from 'react';

// Audio context singleton
let audioContext: AudioContext | null = null;

const initializeAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Generate a loud beep sound
const createBeepSound = async (frequency: number = 800, duration: number = 300, volume: number = 1.0) => {
  try {
    const context = initializeAudioContext();
    
    // Resume audio context if suspended (required for mobile browsers)
    if (context.state === 'suspended') {
      await context.resume();
    }

    // Create oscillator for the beep tone
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Configure the beep
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = 'sine';

    // Set volume (make it loud)
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration / 1000);

    // Play the beep
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration / 1000);

    return new Promise<void>((resolve) => {
      oscillator.onended = () => resolve();
    });
  } catch (error) {
    console.warn('Could not create beep sound:', error);
  }
};

// Trigger vibration on mobile devices
const triggerVibration = () => {
  if ('vibrate' in navigator) {
    // Create a strong vibration pattern: [vibrate, pause, vibrate, pause, vibrate]
    navigator.vibrate([200, 100, 200, 100, 200]);
  }
};

// Play multiple beeps for extra attention
const playAlertSequence = async () => {
  try {
    // Play 3 beeps with different frequencies
    await createBeepSound(800, 200, 1.0);
    await new Promise(resolve => setTimeout(resolve, 100));
    await createBeepSound(1000, 200, 1.0);
    await new Promise(resolve => setTimeout(resolve, 100));
    await createBeepSound(800, 300, 1.0);
    
    // Trigger vibration
    triggerVibration();
  } catch (error) {
    console.warn('Could not play alert sequence:', error);
  }
};

export const useOrderNotifications = (enabled: boolean = true) => {
  const orders = useOrderDataStore(state => state.orders);
  const previousOrdersRef = useRef<typeof orders>([]);
  const isInitializedRef = useRef(false);
  const audioEnabledRef = useRef(false);

  // Initialize audio context on first user interaction
  const initializeAudio = useCallback(async () => {
    if (audioEnabledRef.current) return;
    
    try {
      const context = initializeAudioContext();
      if (context.state === 'suspended') {
        await context.resume();
      }
      audioEnabledRef.current = true;
    } catch (error) {
      console.warn('Could not initialize audio:', error);
    }
  }, []);

  // Auto-enable audio on any user interaction
  useEffect(() => {
    const enableAudioOnInteraction = () => {
      if (!audioEnabledRef.current) {
        initializeAudio();
      }
    };

    // Listen for user interactions to enable audio
    const events = ['click', 'touchstart', 'keydown', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, enableAudioOnInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, enableAudioOnInteraction);
      });
    };
  }, [initializeAudio]);

  useEffect(() => {
    if (!enabled) return;

    // Skip initial load to avoid false positives
    if (!isInitializedRef.current) {
      previousOrdersRef.current = orders;
      isInitializedRef.current = true;
      return;
    }

    // Check for new orders with "new" status
    const previousOrders = previousOrdersRef.current;
    const newOrders = orders.filter(order => {
      const wasNotPreviouslyPresent = !previousOrders.some(prev => prev.id === order.id);
      const hasNewStatus = order.status === 'new';
      return wasNotPreviouslyPresent && hasNewStatus;
    });

    // Also check for existing orders that changed to "new" status
    const statusChangedToNew = orders.filter(order => {
      const previousOrder = previousOrders.find(prev => prev.id === order.id);
      return previousOrder && previousOrder.status !== 'new' && order.status === 'new';
    });

    const allNewStatusOrders = [...newOrders, ...statusChangedToNew];

    // Play notification for each new order with "new" status
    if (allNewStatusOrders.length > 0) {
      console.log(`🔔 New orders detected: ${allNewStatusOrders.length}`);
      console.log('Audio enabled:', audioEnabledRef.current);
      console.log('Orders with new status:', allNewStatusOrders.map(o => ({ id: o.id, status: o.status })));
      playAlertSequence();
    }

    // Update previous orders reference
    previousOrdersRef.current = orders;
  }, [orders, enabled]);
};