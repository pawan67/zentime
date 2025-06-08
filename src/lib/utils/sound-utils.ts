export const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play().catch((error) => {
    console.error("Error playing notification sound:", error);
  });
};
