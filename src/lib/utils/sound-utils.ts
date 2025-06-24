export const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play().catch((error) => {
    console.error("Error playing notification sound:", error);
  });
};

export const playAlarmSound = () => {
  const audio = new Audio("/audio/alarm-kitchen.mp3");
  audio.play().catch((error) => {
    console.error("Error playing alarm sound:", error);
  });
};

export const playButtonSound = () => {
  const audio = new Audio("/audio/button.wav");
  audio.play().catch((error) => {
    console.error("Error playing button sound:", error);
  });
};
