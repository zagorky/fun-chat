import { Header } from '../header/header.tsx';
import { Footer } from '../footer/footer.tsx';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout(props: Readonly<LayoutProps>) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
