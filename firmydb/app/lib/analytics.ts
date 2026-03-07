// Google Analytics 4 Integration
// Track events for FirmyDB app

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for FirmyDB
export const trackSearch = (query: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
    value: resultsCount,
  })
}

export const trackExport = (companiesCount: number) => {
  event({
    action: 'csv_export',
    category: 'conversion',
    label: 'CSV Export',
    value: companiesCount,
  })
}

export const trackCompanyView = (companyName: string) => {
  event({
    action: 'company_detail_view',
    category: 'engagement',
    label: companyName,
  })
}

export const trackFilterUse = (filterType: string, filterValue: string) => {
  event({
    action: 'filter_used',
    category: 'engagement',
    label: `${filterType}: ${filterValue}`,
  })
}
