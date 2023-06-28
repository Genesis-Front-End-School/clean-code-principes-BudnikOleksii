import React from 'react';

export const ErrorPage = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="error-page">
    Mocked ErrorPage
    {children}
  </div>
);
