import { EMAILJS_CONFIG } from '../constants';

// We declare this to avoid TypeScript errors since we loaded the script in index.html
declare global {
  interface Window {
    emailjs: any;
  }
}

export const sendNewsletter = async (userEmail: string, messageContent: string): Promise<boolean> => {
  // Check if EmailJS SDK is loaded
  if (!window.emailjs) {
    console.error("EmailJS SDK not loaded.");
    return false;
  }

  if (EMAILJS_CONFIG.PUBLIC_KEY === 'public_key_here') {
      console.warn("EmailJS not configured. Please add keys to constants.ts");
      return true; // Return true to simulate success in demo mode
  }

  try {
    // Initialize with Public Key
    window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // Send
    await window.emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        to_email: userEmail,
        message: messageContent,
        reply_to: 'no-reply@grid7.net'
      }
    );
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};