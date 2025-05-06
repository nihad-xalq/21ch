'use client';

import { LoadingProvider } from '@/context/LoadingContext';
import { useLoading } from '@/context/LoadingContext';
import SiteLoader from '@/components/SiteLoader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';
import { useEffect } from 'react';

const RootContent = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, stopLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, [stopLoading]);

  return (
    <>
      <SiteLoader isLoading={isLoading} />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <RootContent>{children}</RootContent>
    </LoadingProvider>
  );
} 