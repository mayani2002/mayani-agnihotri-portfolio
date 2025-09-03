'use client';

import React, { useState, useEffect } from 'react';

interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 🚫 NO SERVER-SIDE RENDERING WRAPPER
 * 
 * This component prevents specific parts of your app from being server-rendered.
 * It's essential for avoiding hydration mismatches when components have different
 * server and client behavior.
 * 
 * 🎯 WHEN TO USE:
 * - Components that use localStorage/sessionStorage
 * - Components that depend on window/document objects  
 * - Components with random/dynamic content that changes each render
 * - Components that interact with browser APIs
 * - Third-party components that aren't SSR-compatible
 * 
 * 🔧 HOW IT WORKS:
 * 1. Server renders the fallback (or nothing)
 * 2. Client mounts and shows the actual content
 * 3. No hydration mismatch occurs because server/client match
 * 
 * 📖 EXAMPLE USAGE:
 * <NoSSR fallback={<div>Loading...</div>}>
 *   <ComponentWithWindowObject />
 * </NoSSR>
 */
export const NoSSR: React.FC<NoSSRProps> = ({ children, fallback = null }) => {
  // 🔄 Track if we're running on the client side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // ✅ This only runs on the client, so we know we're mounted
    setMounted(true);
  }, []);

  if (!mounted) {
    // 🖥️ Server-side: render the fallback (or nothing)
    return <>{fallback}</>;
  }

  // 💻 Client-side: render the actual children
  return <>{children}</>;
};

/**
 * 🔧 HIGHER-ORDER COMPONENT VERSION
 * 
 * Alternative way to use NoSSR as a wrapper around components.
 * Useful when you want to make an existing component client-only.
 * 
 * 📖 EXAMPLE:
 * const ClientOnlyMyComponent = withNoSSR(MyComponent, <LoadingSpinner />);
 */
export function withNoSSR<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  const WrappedComponent = (props: P) => (
    <NoSSR fallback={fallback}>
      <Component {...props} />
    </NoSSR>
  );

  WrappedComponent.displayName = `withNoSSR(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
