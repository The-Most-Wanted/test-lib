
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Configuration Google Analytics 4
const GA_MEASUREMENT_ID = 'G-GEBGMVDGCN';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Hook pour tracker les pages vues
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      // Vérifier que gtag est disponible avant de l'utiliser
      if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname,
        });
      }

      // Analytics personnalisés dans Supabase avec gestion d'erreur
      trackCustomEvent('page_view', {
        page_url: window.location.href,
        page_path: location.pathname,
        page_title: document.title,
        referrer: document.referrer
      }).catch(error => {
        console.warn('Analytics tracking failed:', error);
      });
    } catch (error) {
      console.warn('Page tracking failed:', error);
    }
  }, [location]);
};

// Fonction pour tracker des événements personnalisés
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    // Google Analytics 4 avec vérification
    if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }

    // Analytics personnalisés avec gestion d'erreur
    trackCustomEvent(eventName, parameters).catch(error => {
      console.warn('Event tracking failed:', error);
    });
  } catch (error) {
    console.warn('Event tracking failed:', error);
  }
};

// Fonction pour enregistrer des événements dans Supabase avec retry
const trackCustomEvent = async (eventName: string, parameters?: Record<string, any>, retryCount = 0): Promise<void> => {
  try {
    if (typeof window === 'undefined') return;
    
    const sessionId = getOrCreateSessionId();
    
    const { error } = await supabase.from('analytics_events').insert({
      session_id: sessionId,
      event_name: eventName,
      event_category: parameters?.category || 'general',
      event_label: parameters?.label,
      event_value: parameters?.value,
      page_url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    // Retry logic pour éviter les échecs temporaires
    if (retryCount < 2) {
      setTimeout(() => trackCustomEvent(eventName, parameters, retryCount + 1), 1000);
    } else {
      console.warn('Failed to track event after retries:', error);
    }
  }
};

// Générer ou récupérer un ID de session avec fallback robuste
const getOrCreateSessionId = (): string => {
  try {
    if (typeof window === 'undefined') return 'server_session';
    
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  } catch (error) {
    console.warn('Session ID management failed:', error);
    return `fallback_session_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  }
};

// Hook principal pour les analytics avec gestion d'erreur
export const useAnalytics = () => {
  // Utiliser le tracking des pages de manière conditionnelle avec gestion d'erreur
  useEffect(() => {
    try {
      usePageTracking();
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }, []);

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
