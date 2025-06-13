import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Configuration Google Analytics 4
const GA_MEASUREMENT_ID = 'G-GEBGMVDGCN'; // À remplacer par votre ID GA4

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialiser Google Analytics 4
export const initGA4 = () => {
  // Charger le script GA4
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialiser gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_title: document.title,
      page_location: window.location.href,
    });
  `;
  document.head.appendChild(script2);
};

// Hook pour tracker les pages vues
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics 4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }

    // Analytics personnalisés dans Supabase
    trackCustomEvent('page_view', {
      page_url: window.location.href,
      page_path: location.pathname,
      page_title: document.title,
      referrer: document.referrer
    });
  }, [location]);
};

// Fonction pour tracker des événements personnalisés
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }

  // Analytics personnalisés
  trackCustomEvent(eventName, parameters);
};

// Fonction pour enregistrer des événements dans Supabase
const trackCustomEvent = async (eventName: string, parameters?: Record<string, any>) => {
  try {
    const sessionId = getOrCreateSessionId();
    
    await supabase.from('analytics_events').insert({
      session_id: sessionId,
      event_name: eventName,
      event_category: parameters?.category || 'general',
      event_label: parameters?.label,
      event_value: parameters?.value,
      page_url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'événement:', error);
  }
};

// Générer ou récupérer un ID de session
const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Hook principal pour les analytics
export const useAnalytics = () => {
  usePageTracking();

  const trackAddToCart = (bookId: number, bookTitle: string, price: number) => {
    trackEvent('add_to_cart', {
      category: 'ecommerce',
      label: bookTitle,
      value: price,
      currency: 'XOF',
      item_id: bookId.toString(),
      item_name: bookTitle,
      item_category: 'book'
    });
  };

  const trackPurchase = (orderId: string, orderValue: number, items: any[]) => {
    trackEvent('purchase', {
      category: 'ecommerce',
      transaction_id: orderId,
      value: orderValue,
      currency: 'XOF',
      items: items.map(item => ({
        item_id: item.book_id.toString(),
        item_name: item.book.title,
        item_category: 'book',
        quantity: item.quantity,
        price: item.book.price
      }))
    });
  };

  const trackBookView = (bookId: number, bookTitle: string) => {
    trackEvent('view_item', {
      category: 'content',
      label: bookTitle,
      item_id: bookId.toString(),
      item_name: bookTitle,
      item_category: 'book'
    });
  };

  const trackSearch = (searchTerm: string, resultsCount: number) => {
    trackEvent('search', {
      category: 'engagement',
      search_term: searchTerm,
      label: `${resultsCount} résultats`,
      value: resultsCount
    });
  };

  const trackContactForm = (formType: string) => {
    trackEvent('form_submit', {
      category: 'engagement',
      label: formType,
      form_type: formType
    });
  };

  return {
    trackAddToCart,
    trackPurchase,
    trackBookView,
    trackSearch,
    trackContactForm,
    trackEvent
  };
};